import { readFileSync } from "node:fs"
import { isAbsolute, resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { inputIn, type Piping } from "@akasha/command-system/piping"

export const OK = 0

export const INPUT = 1

export const OPERATIONAL = 3

export const JSON_SAID = "--json"

export const PIPED_SAID = "-"

const TRAILING_LINES = /(?:\r?\n)+$/

export type Said = {
  readonly named: Readonly<Record<string, string>>
  readonly loose: readonly string[]
  readonly flags: ReadonlySet<string>
}

export type Reading<T> = T | { readonly refused: readonly string[] }

export function wordsIn(
  argv: readonly string[],
  valued: readonly string[],
  switches: readonly string[]
): Reading<Said> {
  const refusals: string[] = []
  const named: Record<string, string> = {}
  const loose: string[] = []
  const flags = new Set<string>()
  const takes = (word: string): boolean => valued.includes(word) || switches.includes(word)
  for (let at = 0; at < argv.length; at += 1) {
    const word = argv[at]
    if (word === undefined) continue
    if (switches.includes(word)) {
      flags.add(word)
      continue
    }
    if (valued.includes(word)) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined || takes(value)) {
        refusals.push(`\`${word}\` names a value, and nothing that could be one followed it`)
        continue
      }
      if (named[word] !== undefined) {
        refusals.push(`\`${word}\` is said once, and it was said twice`)
        continue
      }
      named[word] = value
      continue
    }
    if (word.startsWith("--")) {
      const every = [...valued, ...switches].map((one) => `\`${one}\``).join(", ")
      refusals.push(`\`${word}\` is no flag this takes — it takes ${every}`)
      continue
    }
    loose.push(word)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { named, loose, flags }
}

export function wordFilling(said: Said, flag: string, wants: string): Reading<string | undefined> {
  if (said.loose.length > 1) {
    const extra = said.loose
      .slice(1)
      .map((one) => `\`${one}\``)
      .join(", ")
    return { refused: [`this names ${wants} once, and ${extra} followed the one it named`] }
  }
  const word = said.loose[0]
  const named = said.named[flag]
  if (word !== undefined && named !== undefined) {
    return {
      refused: [`${wants} is said at \`${flag}\` and as a word, and one way at a time is the way`],
    }
  }
  return named ?? word
}

export function pathAt(root: string, path: string): string {
  return isAbsolute(path) ? path : resolve(root, path)
}

export type Held = { readonly text: string } | { readonly refused: readonly string[] }

export function heldAt(given: Given, flag: string, path: string, piping: Piping = inputIn): Held {
  if (path === PIPED_SAID) {
    const input = piping()
    if ("tty" in input) {
      return { refused: [`\`${flag} -\` names the input, and nothing is piped in`] }
    }
    if ("unreadable" in input) {
      return { refused: [`the input would not open — ${input.unreadable}`] }
    }
    return { text: new TextDecoder().decode(input.bytes) }
  }
  try {
    return { text: readFileSync(pathAt(given.root, path), "utf8") }
  } catch (thrown) {
    return { refused: [`\`${flag} ${path}\` would not open — ${whyOf(thrown)}`] }
  }
}

export type Filing = {
  readonly said: string
  readonly file: string
}

export function filing(said: string): Filing {
  return { said, file: `${said}-file` }
}

export type Prose = { readonly text: string | undefined } | { readonly refused: readonly string[] }

export function proseIn(given: Given, said: Said, one: Filing, piping: Piping = inputIn): Prose {
  const inline = said.named[one.said]
  const path = said.named[one.file]
  if (inline !== undefined && path !== undefined) {
    return {
      refused: [
        `\`${one.said}\` and \`${one.file}\` both say what to send, and one way at a time is the way`,
      ],
    }
  }
  if (inline !== undefined) return { text: inline }
  if (path === undefined) return { text: undefined }
  const held = heldAt(given, one.file, path, piping)
  if ("refused" in held) return held
  return { text: held.text.replace(TRAILING_LINES, "") }
}

export function refusedBy(said: readonly string[]): Answer {
  return { report: [], refusals: said, code: INPUT }
}

export function told(report: readonly string[]): Answer {
  return { report, refusals: [], code: OK }
}

export function asJson(value: unknown): Answer {
  return told([JSON.stringify(value)])
}

export function faulted(thrown: unknown): Answer {
  return { report: [], refusals: [whyOf(thrown)], code: OPERATIONAL }
}

export async function answering(work: () => Answer | Promise<Answer>): Promise<Answer> {
  try {
    return await work()
  } catch (thrown) {
    return faulted(thrown)
  }
}
