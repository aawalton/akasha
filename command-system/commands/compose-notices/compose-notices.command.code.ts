import { writeFileSync } from "node:fs"
import { isAbsolute, resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { notices } from "@akasha/seat-system/compose-notices"

export const OUT = "--out"

export type Read = { readonly out: string | null } | { readonly refused: readonly string[] }

// WHAT WAS SAID ON THE LINE. The file this was carried from ended the process on the first word
// it did not take; every word is read here and every one it does not take is named, because a
// refusal a caller reads once is worth more than the first of four.
export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  let out: string | null = null
  for (let i = 0; i < argv.length; i += 1) {
    const one = argv[i]
    if (one === OUT) {
      const value = argv[i + 1]
      if (value === undefined) refusals.push(`\`${OUT}\` takes a value, and none was named`)
      else {
        i += 1
        out = value
      }
      continue
    }
    refusals.push(`\`${one}\` is no word this takes — it takes \`${OUT} <path>\``)
  }
  if (refusals.length > 0) return { refused: refusals }
  return { out }
}

// TWO SPACES, AND THAT IS LOAD-BEARING. Every other command the editor asks says its JSON compact;
// this one is indented, as the file it was carried from was, so a caller diffing what it composed
// against what it composed before reads a match as a match.
export function saidOf(found: Readonly<Record<string, string>>): string {
  return JSON.stringify(found, null, 2)
}

// A path a command is named is read against the repository root rather than the calling folder.
export function pathOf(said: string, root: string): string {
  return isAbsolute(said) ? said : resolve(root, said)
}

export function composeNotices(argv: readonly string[], given: Given): Answer {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  let found: Readonly<Record<string, string>>
  // A folder that is not there and a folder holding no notice page are the two the module throws
  // on, and they are the two this refused on while it composed the notices itself, so a throw
  // refuses here on the line those were refused on rather than reading as a fault in the command.
  try {
    found = notices()
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 1 }
  }
  try {
    const json = saidOf(found)
    if (read.out === null) return { report: [json], refusals: [], code: 0 }
    writeFileSync(pathOf(read.out, resolve(given.root)), `${json}\n`)
    return { report: [], refusals: [], code: 0 }
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
}
