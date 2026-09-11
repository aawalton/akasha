import { lstatSync } from "node:fs"
import { basename, dirname, join, resolve } from "node:path"
import { guardedIn } from "akasha/agents/hooks/agent-hooks/block-akasha-edits/block-akasha-edits.agent-hook.code.ts"
import { parseHookPayload } from "akasha/agents/hooks/answer/hook-answer.module.code.ts"
import { insideOf, settled } from "akasha/agents/hooks/settling/settling.module.code.ts"
import {
  basenameOf,
  calledWords,
  dequoted,
  joinedContinuations,
  pastHeredocs,
  segmentsOf,
  wordsOf,
} from "akasha/agents/hooks/shell-calls/shell-calls.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { gitIgnoring } from "akasha/git/pathspec/git-pathspec.module.code.ts"
import { z } from "zod"

const HOOK_NAME = "block-akasha-shell-writes"

const UNREADABLE = 5

const REFUSED = 2

const DD = "dd"

const REDIRECTED = "a redirect"

const ONTO_THE_LAST = new Set(["cp", "mv", "install", "ln"])

const LINKING = "ln"

const TARGET_AND_LINK = 2

const ONTO_EVERY_ONE = new Set(["tee", "truncate", "touch"])

const TAKING_AWAY = new Set(["rm", "rmdir"])

const FOLLOWING = new Set(["", ".", ".."])

const MAKING = new Set(["mkdir"])

const READING_A_PROGRAM = new Set([
  "python",
  "python2",
  "python3",
  "node",
  "bun",
  "bunx",
  "deno",
  "ruby",
  "perl",
  "php",
  "lua",
  "luajit",
  "Rscript",
  "osascript",
])

const INTO = new Set(["-t", "--target-directory"])

const NOT_FOLLOWING = "--no-dereference"

const NOT_FOLLOWING_FLAG = "n"

const CARRYING_A_VALUE = new Set(["S", "t"])

const IN_PLACE = new Set(["sed", "perl", "ruby", "awk", "gawk", "mawk"])

const IN_PLACE_LONG = "--in-place"

const IN_PLACE_FLAG = /^-[0-9a-z]*i[0-9a-z.]*$/

const OUT_FILE = /^of=(.+)$/

const REDIRECT = /^\d*>>?(.*)$/

const SPELLED = /[A-Za-z0-9_.~+@/-]+/g

const HEREDOC = /<<-?\s*['"]?([A-Za-z_][A-Za-z0-9_]*)['"]?/

const QUOTES = new Set(["'", '"'])

const SEPARATORS = new Set(["\n", ";", "|", "&"])

const CAPTURED = z.tuple([z.string(), z.string()])

function parseRedirect(word: string): string | null {
  const read = CAPTURED.safeParse(REDIRECT.exec(word))
  return read.success ? read.data[1] : null
}

function parseOutFile(word: string): string | null {
  const read = CAPTURED.safeParse(OUT_FILE.exec(word))
  return read.success ? read.data[1] : null
}

function parseHeredocEnd(one: string): string | null {
  const read = CAPTURED.safeParse(HEREDOC.exec(one))
  return read.success ? read.data[1] : null
}

export type Landing = {
  readonly at: string
  readonly how: string
  readonly keepingTheLink?: true
}

function intoOf(words: readonly string[]): string | null {
  for (let at = 1; at < words.length; at += 1) {
    const word = words[at]
    if (word !== undefined && INTO.has(word)) return words[at + 1] ?? null
    if (word?.startsWith("--target-directory=")) {
      return word.slice("--target-directory=".length)
    }
  }
  return null
}

function pastRedirects(words: readonly string[]): readonly string[] {
  const kept: string[] = []
  for (let at = 0; at < words.length; at += 1) {
    const word = words[at]
    if (word === undefined) continue
    const said = parseRedirect(word)
    if (said === null) {
      kept.push(word)
      continue
    }
    if (said === "") at += 1
  }
  return kept
}

function operandsOf(words: readonly string[]): readonly string[] {
  return pastRedirects(words.slice(1)).filter((one) => !one.startsWith("-"))
}

export function editsInPlace(words: readonly string[]): boolean {
  for (let at = 1; at < words.length; at += 1) {
    const word = words[at]
    if (word === undefined) continue
    if (word === IN_PLACE_LONG || word.startsWith(`${IN_PLACE_LONG}=`)) return true
    if (IN_PLACE_FLAG.test(word)) return true
  }
  return false
}

function keepsTheLink(words: readonly string[]): boolean {
  for (let at = 1; at < words.length; at += 1) {
    const word = words[at]
    if (word === undefined || !word.startsWith("-")) continue
    if (word.startsWith("--")) {
      if (word === NOT_FOLLOWING) return true
      continue
    }
    for (const one of word.slice(1)) {
      if (CARRYING_A_VALUE.has(one)) break
      if (one === NOT_FOLLOWING_FLAG) return true
    }
  }
  return false
}

export function redirectsIn(words: readonly string[]): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < words.length; at += 1) {
    const word = words[at]
    if (word === undefined) continue
    const tail = parseRedirect(word)
    if (tail === null) continue
    if (tail.startsWith("&")) continue
    const target = tail === "" ? (words[at + 1] ?? "") : tail
    if (target !== "") found.push(target)
  }
  return found
}

function landingOn(at: string, how: string, kept: boolean): Landing {
  if (kept) return { at, how, keepingTheLink: true }
  return { at, how }
}

export function landingsIn(command: string): readonly Landing[] {
  const found: Landing[] = []
  for (const segment of segmentsOf(dequoted(pastHeredocs(command)))) {
    const words = calledWords(segment)
    const first = words[0]
    if (first !== undefined) {
      const tool = basenameOf(first)
      if (ONTO_THE_LAST.has(tool)) {
        const into = intoOf(words)
        const operands = operandsOf(words)
        const last = into ?? (operands.length > 1 ? operands[operands.length - 1] : undefined)
        if (last !== undefined && last !== "") {
          const kept =
            tool === LINKING &&
            into === null &&
            operands.length === TARGET_AND_LINK &&
            keepsTheLink(words)
          found.push(landingOn(last, tool, kept))
        }
      }
      if (
        ONTO_EVERY_ONE.has(tool) ||
        TAKING_AWAY.has(tool) ||
        MAKING.has(tool) ||
        (IN_PLACE.has(tool) && editsInPlace(words))
      ) {
        for (const one of operandsOf(words)) found.push({ at: one, how: tool })
      }
      if (tool === DD) {
        for (const word of words.slice(1)) {
          const target = parseOutFile(word)
          if (target !== null && target !== "") found.push({ at: target, how: tool })
        }
      }
    }
    for (const target of redirectsIn(wordsOf(segment))) found.push({ at: target, how: REDIRECTED })
  }
  return found
}

export function programsIn(command: string): readonly string[] {
  const found: string[] = []
  for (const segment of segmentsOf(command)) {
    const head = calledWords(segment)[0]
    if (head === undefined) continue
    const tool = basenameOf(head)
    if (READING_A_PROGRAM.has(tool) && !found.includes(tool)) found.push(tool)
  }
  return found
}

export function rawCallsIn(command: string): readonly string[] {
  const found: string[] = []
  const text = joinedContinuations(command)
  let held = ""
  let quote = ""
  for (const one of text) {
    if (quote !== "") {
      held += one
      if (one === quote) quote = ""
      continue
    }
    if (QUOTES.has(one)) {
      quote = one
      held += one
      continue
    }
    if (SEPARATORS.has(one)) {
      found.push(held)
      held = ""
      continue
    }
    held += one
  }
  found.push(held)
  return found.map((one) => one.trim()).filter((one) => one !== "")
}

export function programHandedIn(calls: readonly string[], at: number): string {
  const one = calls[at] ?? ""
  const ends = parseHeredocEnd(one)
  if (ends === null) return one
  let text = one
  for (let next = at + 1; next < calls.length; next += 1) {
    const line = calls[next] ?? ""
    if (line === ends) break
    text += `\n${line}`
  }
  return text
}

export function programLandingsIn(command: string): readonly Landing[] {
  const calls = rawCallsIn(command)
  const found: Landing[] = []
  for (let at = 0; at < calls.length; at += 1) {
    const head = calledWords(segmentsOf(calls[at] ?? "")[0] ?? "")[0]
    if (head === undefined) continue
    const tool = basenameOf(head)
    if (!READING_A_PROGRAM.has(tool)) continue
    for (const shown of pathsSpelledIn(programHandedIn(calls, at))) {
      found.push({ at: shown, how: tool })
    }
  }
  return found
}

export function pathsSpelledIn(command: string): readonly string[] {
  const found: string[] = []
  for (const said of command.matchAll(SPELLED)) {
    const one = said[0]
    if (one.includes("/") && !found.includes(one)) found.push(one)
  }
  return found
}

function road(shown: string): readonly string[] {
  return [
    "",
    `  akasha read --file-path ${shown}`,
    "  akasha change apply",
    `  akasha git restore --file-path ${shown}`,
    "",
    "A body reaches a change piped in rather than on the command line:",
    "",
    "akasha change draft add-file <<'HEREDOC'",
    `at: ${shown}`,
    "body HEREDOC-BODY",
    "<the whole body>",
    "HEREDOC-BODY",
    "HEREDOC",
    "",
    "`remove-file` takes the path away, and is handed `at` alone.",
    "A change keeps the edits it answers, and the apply lands every edit kept.",
    "A restore puts the path back as HEAD holds it, and is the route for undoing drift.",
  ]
}

function refusing(how: string, shown: string, index: boolean): string {
  const said =
    how === REDIRECTED
      ? `${HOOK_NAME}: a redirect lands on \`${shown}\``
      : `${HOOK_NAME}: \`${how}\` lands on \`${shown}\``
  if (index) {
    return [
      `${said}, inside the akasha index.`,
      "The pages and the index are two halves of one store. Rebuild it instead:",
      "",
      "  akasha index refresh",
    ].join("\n")
  }
  return [
    `${said}, inside the akasha folder.`,
    "The akasha commands write that folder — they check the change and commit it.",
    "A shell write goes around the gate, so it is refused here as an Edit or a Write is.",
    ...road(shown),
  ].join("\n")
}

function refusingAProgram(tool: string, shown: string, index: boolean): string {
  const said = `${HOOK_NAME}: \`${tool}\` runs a program naming \`${shown}\``
  if (index) {
    return [
      `${said}, inside the akasha index.`,
      "A program's own text is not read here, so a write through it is not parted from a read.",
      "The pages and the index are two halves of one store. Rebuild it instead:",
      "",
      "  akasha index refresh",
    ].join("\n")
  }
  return [
    `${said}, inside the akasha folder.`,
    "A program's own text is not read here, so a write through it is not parted from a read,",
    "and naming the path at all is what is refused.",
    ...road(shown),
  ].join("\n")
}

export function namesTheLink(shown: string): boolean {
  return !FOLLOWING.has(shown.slice(shown.lastIndexOf("/") + 1))
}

function aLink(at: string): boolean {
  return lstatSync(at, { throwIfNoEntry: false })?.isSymbolicLink() ?? false
}

function judgedAtTheLink(landing: Landing): boolean {
  return TAKING_AWAY.has(landing.how) || landing.keepingTheLink === true
}

function landedAt(from: string, landing: Landing): string {
  const spelled = resolve(from, landing.at)
  if (judgedAtTheLink(landing) && namesTheLink(landing.at)) {
    const atTheLink = join(settled(dirname(spelled)), basename(spelled))
    if (aLink(atTheLink)) return atTheLink
  }
  return settled(spelled)
}

type Judged = {
  readonly landing: Landing
  readonly at: string
  readonly program: boolean
}

function refusalOf(one: Judged): string {
  if (one.program) return refusingAProgram(one.landing.how, one.landing.at, false)
  return refusing(one.landing.how, one.landing.at, false)
}

export function refusalFor(command: string, from: string, root: string): string | null {
  const here = settled(root)
  const guarded = guardedIn(here)
  const landings = landingsIn(command)
  const programs = programLandingsIn(command)
  for (const landing of landings) {
    const at = settled(resolve(from, landing.at))
    if (insideOf(guarded.index, at)) return refusing(landing.how, landing.at, true)
  }
  for (const landing of programs) {
    const at = settled(resolve(from, landing.at))
    if (insideOf(guarded.index, at)) return refusingAProgram(landing.how, landing.at, true)
  }
  const judged: Judged[] = []
  for (const landing of landings) {
    const at = landedAt(from, landing)
    if (insideOf(guarded.pages, at)) judged.push({ landing, at, program: false })
  }
  for (const landing of programs) {
    const at = settled(resolve(from, landing.at))
    if (insideOf(guarded.pages, at)) judged.push({ landing, at, program: true })
  }
  if (judged.length === 0) return null
  const ignored = gitIgnoring(
    here,
    judged.map((one) => one.at)
  )
  for (const one of judged) {
    if (ignored?.has(one.at) === true) continue
    return refusalOf(one)
  }
  return null
}

async function main(): Promise<number> {
  const raw = await Bun.stdin.text()
  if (raw.trim() === "") return 0
  let payload: Record<string, unknown> | null
  try {
    payload = parseHookPayload(raw)
  } catch {
    process.stderr.write(`${HOOK_NAME}: the hook payload would not read, so nothing was judged\n`)
    return UNREADABLE
  }
  const held = (payload ?? {}) as {
    readonly tool_input?: { readonly command?: unknown }
    readonly cwd?: unknown
  }
  const command = typeof held.tool_input?.command === "string" ? held.tool_input.command : ""
  if (command.trim() === "") return 0
  const from = typeof held.cwd === "string" && held.cwd !== "" ? held.cwd : process.cwd()
  const said = refusalFor(command, from, rootOf(import.meta.path))
  if (said === null) return 0
  process.stderr.write(`${said}\n`)
  process.stdout.write(`${JSON.stringify({ decision: "block", reason: said }, null, 2)}\n`)
  return REFUSED
}

export async function ran(): Promise<number> {
  return await main()
}

if (import.meta.main) process.exit(await ran())
