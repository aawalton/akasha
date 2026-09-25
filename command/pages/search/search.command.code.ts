import { existsSync, readFileSync } from "node:fs"
import { join, relative, resolve } from "node:path"
import {
  blobIdOf,
  recordSightings,
  type Sighting,
} from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { contextLines } from "akasha/command/argument/pages/context-lines.argument.ts"
import { fileType } from "akasha/command/argument/pages/file-type.argument.ts"
import { filesOnly } from "akasha/command/argument/pages/files-only.argument.ts"
import { glob } from "akasha/command/argument/pages/glob.argument.ts"
import { ignoreCase } from "akasha/command/argument/pages/ignore-case.argument.ts"
import { pattern } from "akasha/command/argument/pages/pattern.argument.ts"
import { within } from "akasha/command/argument/pages/within.argument.ts"
import {
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { ANSWER_CEILING, widthOf } from "akasha/command/modules/long-body/long-body.module.code.ts"
import {
  type Discard,
  discarded,
} from "akasha/command/modules/output-reaching/output-reaching.module.code.ts"
import { pagedFor } from "akasha/command/modules/page-waiting/page-waiting.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { NO_AGENT, noPageFor, PAGE_CEILING } from "akasha/command/pages/read/read.command.code.ts"
import { search as page } from "akasha/command/pages/search/search.command.ts"
import {
  withheldAt,
  withheldFor,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"
import { z } from "zod"

const RIPGREP = "rg"

const LINE_WIDTH = 400

const NUMBER_WIDTH = 6

const MATCHED = ":"

const AROUND = "-"

const BREAK = "--"

const HERE = "./"

const NOTHING_MATCHED = 1

const KEPT_FOR_CLOSING = 800

const ARGUMENTS = [pattern, within, glob, fileType, contextLines, filesOnly, ignoreCase] as const

export type Asked = {
  readonly pattern: string
  readonly within: readonly string[]
  readonly globs: readonly string[]
  readonly types: readonly string[]
  readonly around: number | null
  readonly filesOnly: boolean
  readonly ignoreCase: boolean
}

type Block = { readonly path: string; readonly lines: string[]; readonly shown: number[] }

type Gathered = {
  readonly blocks: ReadonlyMap<string, Block>
  readonly full: boolean
  readonly barred: number
  readonly err: string
}

type Taking = {
  readonly asked: Asked
  readonly withheld: readonly string[]
  readonly root: string
  readonly budget: number
}

const EVENT = z.object({
  type: z.string(),
  data: z.looseObject({
    path: z.object({ text: z.string() }).optional(),
    lines: z.object({ text: z.string().optional() }).optional(),
    line_number: z.number().nullable().optional(),
  }),
})

export function ripgrepArguments(asked: Asked): readonly string[] {
  const said: string[] = [asked.filesOnly ? "--files-with-matches" : "--json"]
  said.push("--no-config", "--no-messages")
  if (asked.ignoreCase) said.push("--ignore-case")
  if (asked.around !== null && !asked.filesOnly) said.push("--context", String(asked.around))
  for (const one of asked.types) said.push("--type", one)
  for (const one of asked.globs) said.push("--glob", one)
  said.push("--glob", "!.git", "--regexp", asked.pattern, "--", ...asked.within)
  return said
}

export function shownLine(at: number, text: string, matched: boolean): string {
  const bare = text.endsWith("\n") ? text.slice(0, -1) : text
  const over = bare.length - LINE_WIDTH
  const kept = over > 0 ? `${bare.slice(0, LINE_WIDTH)} … ${over} more characters` : bare
  return `${String(at).padStart(NUMBER_WIDTH)}${matched ? MATCHED : AROUND}\t${kept}`
}

function pathOf(said: string): string {
  return said.startsWith(HERE) ? said.slice(HERE.length) : said
}

function aimedIn(
  root: string,
  named: readonly string[]
): { readonly paths: readonly string[] } | { readonly refusals: readonly string[] } {
  const paths: string[] = []
  const refusals: string[] = []
  const top = resolve(root)
  for (const one of named) {
    const at = resolve(one.startsWith("/") ? one : join(top, one))
    if (at !== top && !at.startsWith(`${top}/`)) {
      refusals.push(`${one} sits outside the repository — a search reaches what sits inside it`)
    } else if (!existsSync(at)) {
      refusals.push(`${one} names nothing — a search is named a file or folder that is there`)
    } else paths.push(relative(top, at) || ".")
  }
  return refusals.length > 0 ? { refusals } : { paths }
}

function barredAt(taking: Taking, path: string): boolean {
  return taking.withheld.length > 0 && withheldAt(join(taking.root, path), taking.withheld)
}

type Tally = {
  readonly blocks: Map<string, Block>
  readonly barred: Set<string>
  spent: number
  full: boolean
}

function lineTaken(tally: Tally, taking: Taking, line: string): boolean {
  if (taking.asked.filesOnly) return pathTaken(tally, taking, line)
  let read: z.infer<typeof EVENT>
  try {
    read = EVENT.parse(JSON.parse(line))
  } catch {
    return true
  }
  if (read.type !== "match" && read.type !== "context") return true
  const path = pathOf(read.data.path?.text ?? "")
  const at = read.data.line_number ?? 0
  if (path === "" || at <= 0) return true
  if (barredAt(taking, path)) {
    tally.barred.add(path)
    return true
  }
  return shownTaken(
    tally,
    taking,
    path,
    shownLine(at, read.data.lines?.text ?? "", read.type === "match"),
    at
  )
}

function shownTaken(
  tally: Tally,
  taking: Taking,
  path: string,
  shown: string,
  at: number
): boolean {
  const held = tally.blocks.get(path)
  const last = held?.shown.at(-1)
  const parted = last !== undefined && at > last + 1
  const cost =
    widthOf(shown) + (held === undefined ? widthOf(path) : 0) + (parted ? widthOf(BREAK) : 0)
  if (tally.spent + cost > taking.budget) {
    tally.full = true
    return false
  }
  tally.spent += cost
  const block = held ?? { path, lines: [], shown: [] }
  if (parted) block.lines.push(BREAK)
  block.lines.push(shown)
  block.shown.push(at)
  tally.blocks.set(path, block)
  return true
}

function pathTaken(tally: Tally, taking: Taking, line: string): boolean {
  const path = pathOf(line.trim())
  if (path === "") return true
  if (barredAt(taking, path)) {
    tally.barred.add(path)
    return true
  }
  const cost = widthOf(path)
  if (tally.spent + cost > taking.budget) {
    tally.full = true
    return false
  }
  tally.spent += cost
  tally.blocks.set(path, { path, lines: [], shown: [] })
  return true
}

async function linesTaken(
  child: Bun.Subprocess<"ignore", "pipe", "pipe">,
  tally: Tally,
  taking: Taking
): Promise<undefined> {
  const decoder = new TextDecoder()
  let left = ""
  for await (const chunk of child.stdout) {
    const lines = (left + decoder.decode(chunk, { stream: true })).split("\n")
    left = lines.pop() ?? ""
    for (const line of lines) {
      if (line !== "" && !lineTaken(tally, taking, line)) {
        child.kill()
        return undefined
      }
    }
  }
  if (left !== "") lineTaken(tally, taking, left)
  return undefined
}

async function gathered(taking: Taking): Promise<Gathered> {
  const child = Bun.spawn([RIPGREP, ...ripgrepArguments(taking.asked)], {
    cwd: taking.root,
    stdin: "ignore",
    stdout: "pipe",
    stderr: "pipe",
  })
  const tally: Tally = { blocks: new Map(), barred: new Set(), spent: 0, full: false }
  await linesTaken(child, tally, taking)
  const err = await new Response(child.stderr).text()
  const code = await child.exited
  const failed = !tally.full && code !== 0 && code !== NOTHING_MATCHED
  return {
    blocks: tally.blocks,
    full: tally.full,
    barred: tally.barred.size,
    err: failed ? err.trim() : "",
  }
}

function sightingsOf(root: string, blocks: readonly Block[], now: number): readonly Sighting[] {
  const found: Sighting[] = []
  for (const one of blocks) {
    let bytes: Uint8Array
    try {
      bytes = readFileSync(join(root, one.path))
    } catch {
      continue
    }
    found.push({ path: one.path, oid: blobIdOf(bytes), seenAt: now, linesShown: [...one.shown] })
  }
  return found
}

function closingOf(got: Gathered, asked: Asked, shown: number): readonly string[] {
  const said: string[] = []
  if (got.barred > 0) {
    const one = got.barred === 1
    said.push(
      `${got.barred} file${one ? "" : "s"} that matched ${one ? "is" : "are"} lore the world ` +
        `builder holds, so ${one ? "it was" : "they were"} left out.`
    )
  }
  if (got.full) {
    said.push(
      `The answer stopped at the ${ANSWER_CEILING} bytes one answer holds, so what matched after ` +
        `this was not shown. A narrower search shows it: name \`${within.said}\`, \`${glob.said}\` ` +
        `or \`${fileType.said}\`, or a closer pattern.`
    )
  }
  if (shown === 0 && !got.full) said.push(`Nothing matched \`${asked.pattern}\`.`)
  if (shown > 0 && !asked.filesOnly) {
    said.push(
      `Each file shown is recorded as seen in part, and a part seen is no read: a write to one ` +
        "still owes a read of that whole file."
    )
  }
  return said
}

function reportOf(blocks: readonly Block[], filesOnlyAsked: boolean): readonly string[] {
  if (filesOnlyAsked) return blocks.map((one) => one.path)
  return blocks.flatMap((one) => [one.path, ...one.lines])
}

function askedOf(taken: {
  readonly pattern: string
  readonly within: readonly string[]
  readonly glob: readonly string[]
  readonly fileType: readonly string[]
  readonly contextLines?: number | undefined
  readonly filesOnly: boolean
  readonly ignoreCase: boolean
}): Asked {
  return {
    pattern: taken.pattern,
    within: taken.within,
    globs: taken.glob,
    types: taken.fileType,
    around: taken.contextLines ?? null,
    filesOnly: taken.filesOnly,
    ignoreCase: taken.ignoreCase,
  }
}

function unheard(given: Given, thrown: Discard | null, wait: number): Answer | null {
  if (thrown !== null) {
    return mistaking([
      `this call's output goes to ${thrown}, so the lines would reach nobody. What the record says ` +
        "is that the lines reached you, so nothing is searched here and nothing is recorded. Run " +
        `it again with the output reaching you, or name \`${filesOnly.said}\`, which records nothing`,
    ])
  }
  const agentId = given.agentId
  if (agentId === null) return mistaking([NO_AGENT])
  if (!pagedFor(given.root, agentId, wait))
    return refusedBy([noPageFor(agentId, wait)], OPERATIONAL)
  return null
}

async function answered(given: Given, asked: Asked): Promise<Answer> {
  const taking: Taking = {
    asked,
    withheld: withheldFor(given.root, given.agentId),
    root: given.root,
    budget: ANSWER_CEILING - KEPT_FOR_CLOSING,
  }
  let got: Gathered
  try {
    got = await gathered(taking)
  } catch (thrown) {
    const why = thrown instanceof Error ? thrown.message : String(thrown)
    return refusedBy([`ripgrep would not run, so nothing was searched — ${why}`], OPERATIONAL)
  }
  if (got.err !== "") return mistaking([`ripgrep refused this search — ${got.err}`])
  const blocks = [...got.blocks.values()].sort((one, two) => (one.path < two.path ? -1 : 1))
  if (!asked.filesOnly && given.agentId !== null) {
    recordSightings(given.root, given.agentId, sightingsOf(given.root, blocks, Date.now()))
  }
  return told([...reportOf(blocks, asked.filesOnly), ...closingOf(got, asked, blocks.length)])
}

export async function searchWith(
  argv: readonly string[],
  given: Given,
  thrown: Discard | null,
  wait: number = PAGE_CEILING
): Promise<Answer> {
  const meant = takenFor(argv, given.calledAs, page, ARGUMENTS)
  if ("refused" in meant) return mistaking(meant.refused)
  const asked = askedOf(meant.taken)
  const aimed = aimedIn(given.root, asked.within)
  if ("refusals" in aimed) return mistaking(aimed.refusals)
  if (!asked.filesOnly) {
    const refused = unheard(given, thrown, wait)
    if (refused !== null) return refused
  }
  return await answered(given, { ...asked, within: aimed.paths })
}

export async function search(argv: readonly string[], given: Given): Promise<Answer> {
  return await searchWith(argv, given, discarded())
}
