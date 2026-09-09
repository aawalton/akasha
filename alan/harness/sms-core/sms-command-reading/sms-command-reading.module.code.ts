import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { whyOf } from "@akasha/command-system/fault-saying"
import type { Given } from "../../../../commands/modules/calling/calling.module.code.ts"
import {
  type Filing,
  filing,
} from "../../../../commands/modules/filling/command-filling.module.code.ts"
import { inputIn, type Piping } from "../../../../commands/modules/piping/piping.module.code.ts"

export const JSON_SAID = "--json"

export const PIPED_SAID = "-"

export const TEXT = filing("--text")

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
    return { text: readFileSync(resolve(given.root, path), "utf8") }
  } catch (thrown) {
    return { refused: [`\`${flag} ${path}\` would not open — ${whyOf(thrown)}`] }
  }
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
