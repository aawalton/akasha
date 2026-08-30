import { resolve } from "node:path"
import { rootOf } from "../../../command-system/rooting/rooting.module.code.ts"
import { insideOf, settled } from "../../settling/settling.module.code.ts"
import {
  basenameOf,
  dequoted,
  segmentsOf,
  wordsOf,
} from "../../shell-calls/shell-calls.module.code.ts"
import { guardedIn } from "../block-akasha-edits/block-akasha-edits.agent-hook.code.ts"

const HOOK_NAME = "block-akasha-shell-writes"

const UNREADABLE = 5

const REFUSED = 2

const COPY = "cp"

const MOVE = "mv"

const TEE = "tee"

const DD = "dd"

const REDIRECTED = "a redirect"

const INTO = new Set(["-t", "--target-directory"])

const IN_PLACE = new Set(["sed", "perl", "ruby", "awk", "gawk", "mawk"])

const IN_PLACE_LONG = "--in-place"

const IN_PLACE_FLAG = /^-[0-9a-z]*i[0-9a-z.]*$/

const OUT_FILE = /^of=(.+)$/

const REDIRECT = /^\d*>>?(.*)$/

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
    const words = wordsOf(segment)
    const first = words[0]
    if (first !== undefined) {
      const tool = basenameOf(first)
      if (tool === COPY || tool === MOVE) {
        const into = intoOf(words)
        const operands = operandsOf(words)
        const last = into ?? (operands.length > 1 ? operands[operands.length - 1] : undefined)
        if (last !== undefined && last !== "") found.push({ at: last, how: tool })
      }
      if (tool === TEE || (IN_PLACE.has(tool) && editsInPlace(words))) {
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
    for (const target of redirectsIn(words)) found.push({ at: target, how: REDIRECTED })
  }
  return found
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
    "",
    `  akasha write --file-path ${shown} --content-file <body> --message "<what this is for>"`,
    "",
    "Write the body anywhere outside `akasha/` first — a shell write there is not refused.",
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

if (import.meta.main) process.exit(await main())
