import { resolve } from "node:path"
import { rootOf } from "@akasha/command-system/rooting"
import { insideOf, settled } from "../../settling/settling.module.code.ts"
import {
  basenameOf,
  calledWords,
  dequoted,
  joinedContinuations,
  segmentsOf,
  wordsOf,
} from "../../shell-calls/shell-calls.module.code.ts"
import { guardedIn } from "../block-akasha-edits/block-akasha-edits.agent-hook.code.ts"

const HOOK_NAME = "block-akasha-shell-writes"

const UNREADABLE = 5

const REFUSED = 2

const DD = "dd"

const REDIRECTED = "a redirect"

const ONTO_THE_LAST = new Set(["cp", "mv", "install", "ln"])

const ONTO_EVERY_ONE = new Set(["tee", "truncate", "touch"])

const TAKING_AWAY = new Set(["rm", "rmdir"])

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

const IN_PLACE = new Set(["sed", "perl", "ruby", "awk", "gawk", "mawk"])

const IN_PLACE_LONG = "--in-place"

const IN_PLACE_FLAG = /^-[0-9a-z]*i[0-9a-z.]*$/

const OUT_FILE = /^of=(.+)$/

const REDIRECT = /^\d*>>?(.*)$/

const SPELLED = /[A-Za-z0-9_.~+@/-]+/g

const HEREDOC = /<<-?\s*['"]?([A-Za-z_][A-Za-z0-9_]*)['"]?/

const QUOTES = new Set(["'", '"'])

const SEPARATORS = new Set(["\n", ";", "|", "&"])

export type Landing = {
  readonly at: string
  readonly how: string
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

function operandsOf(words: readonly string[]): readonly string[] {
  return words.slice(1).filter((one) => !one.startsWith("-"))
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

export function redirectsIn(words: readonly string[]): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < words.length; at += 1) {
    const word = words[at]
    if (word === undefined) continue
    const said = REDIRECT.exec(word)
    if (said === null) continue
    const tail = said[1] ?? ""
    if (tail.startsWith("&")) continue
    const target = tail === "" ? (words[at + 1] ?? "") : tail
    if (target !== "") found.push(target)
  }
  return found
}

export function landingsIn(command: string): readonly Landing[] {
  const found: Landing[] = []
  for (const segment of segmentsOf(dequoted(command))) {
    const words = calledWords(segment)
    const first = words[0]
    if (first !== undefined) {
      const tool = basenameOf(first)
      if (ONTO_THE_LAST.has(tool)) {
        const into = intoOf(words)
        const operands = operandsOf(words)
        const last = into ?? (operands.length > 1 ? operands[operands.length - 1] : undefined)
        if (last !== undefined && last !== "") found.push({ at: last, how: tool })
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
          const said = OUT_FILE.exec(word)
          const target = said?.[1]
          if (target !== undefined && target !== "") found.push({ at: target, how: tool })
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
  const said = HEREDOC.exec(one)
  if (said === null) return one
  const ends = said[1]
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
    `  akasha write --file-path ${shown} --content-file <body> --message "<what this is for>"`,
    `  akasha remove --file-path ${shown} --message "<why this goes>"`,
    "",
    "Write the body anywhere outside `akasha/` first — a shell write there is not refused.",
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

export function refusalFor(command: string, from: string, root: string): string | null {
  const here = settled(root)
  const guarded = guardedIn(here)
  for (const landing of landingsIn(command)) {
    const at = settled(resolve(from, landing.at))
    if (insideOf(guarded.pages, at)) return refusing(landing.how, landing.at, false)
    if (insideOf(guarded.index, at)) return refusing(landing.how, landing.at, true)
  }
  for (const landing of programLandingsIn(command)) {
    const at = settled(resolve(from, landing.at))
    if (insideOf(guarded.pages, at)) return refusingAProgram(landing.how, landing.at, false)
    if (insideOf(guarded.index, at)) return refusingAProgram(landing.how, landing.at, true)
  }
  return null
}

async function main(): Promise<number> {
  const raw = await Bun.stdin.text()
  if (raw.trim() === "") return 0
  let payload: unknown
  try {
    payload = JSON.parse(raw)
  } catch {
    process.stderr.write(`${HOOK_NAME}: the hook payload would not read, so nothing was judged\n`)
    return UNREADABLE
  }
  const held = payload as {
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
