import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { isAbsolute, resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"

export const NOTICES = "seat-system/notices/pages"

export const OUT = "--out"

const TAIL = ".notice.text.md"

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

// Wrapping is the author's convenience and no part of the text: the lines of a paragraph are
// joined with a space, and a blank line between two paragraphs survives as one.
export function render(body: string): string {
  return body
    .split(/\n[ \t]*\n/)
    .map((paragraph) =>
      paragraph
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "")
        .join(" ")
    )
    .filter((paragraph) => paragraph !== "")
    .join("\n\n")
}

export function noticesUnder(folder: string): Readonly<Record<string, string>> {
  const notices: Record<string, string> = {}
  for (const name of readdirSync(folder).sort()) {
    if (!name.endsWith(TAIL)) continue
    notices[name.slice(0, -TAIL.length)] = render(readFileSync(`${folder}/${name}`, "utf8"))
  }
  return notices
}

export type Found =
  | { readonly notices: Readonly<Record<string, string>> }
  | { readonly refused: string }

// THE TWO ABSENCES THE CARRIED FILE ENDED THE PROCESS ON. A folder that is not there and a folder
// holding no notice page are each answered here as a refusal the caller reads, because a fleet
// asking for a notice it cannot be given is told so rather than handed an object with no keys.
export function notices(root: string): Found {
  const folder = `${root}/${NOTICES}`
  if (!existsSync(folder)) {
    return { refused: `${folder} is not there, so there is no notice to render` }
  }
  const found = noticesUnder(folder)
  if (Object.keys(found).length === 0) {
    return { refused: `${folder} holds no notice page, so there is no notice to render` }
  }
  return { notices: found }
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
  try {
    const root = resolve(given.root)
    const found = notices(root)
    if ("refused" in found) return { report: [], refusals: [found.refused], code: 1 }
    const json = saidOf(found.notices)
    if (read.out === null) return { report: [json], refusals: [], code: 0 }
    writeFileSync(pathOf(read.out, root), `${json}\n`)
    return { report: [], refusals: [], code: 0 }
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
}
