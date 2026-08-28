
import { readFileSync } from "node:fs"
import { HOLE } from "../page/document/holes.ts"
import { pageRelIn, placeDirOf } from "../page/page-types.ts"
import { AKASHA, rootFor, rootsHere } from "../repo/roots/roots.ts"

const REFUSAL_TYPE = "refusal"

export const REFUSAL_DIR = placeDirOf(REFUSAL_TYPE)

const OPENING = "---\n"

const CLOSING = "\n---\n"

const HEADING = /^#[^\n]*\n/

export class HoleMismatch extends Error {}

export function fill(body: string, values: Readonly<Record<string, string>>): string {
  const used = new Set<string>()
  const text = body.replace(HOLE, (whole, name: string) => {
    const value = values[name]
    if (value === undefined) {
      throw new HoleMismatch(`\`{${name}}\` is marked in the body and no value was handed over`)
    }
    used.add(name)
    return value
  })
  const surplus = Object.keys(values).filter((name) => !used.has(name))
  if (surplus.length > 0) {
    const named = surplus.map((name) => `\`${name}\``).join(", ")
    throw new HoleMismatch(`${named} was handed over and the body marks no such hole`)
  }
  return text
}

/**
 * The words of one refusal, its holes filled.
 *
 * ONE STORE ANSWERS BOTH HALVES. Finding the file and reading it go to the same filesystem, so a
 * refusal that is on disk is never reported absent.
 *
 * THE ROOT DEFAULTS RATHER THAN BEING ASKED FOR: the corpus is this repository's own words, and a
 * fixture tree carrying its own corpus is what names itself instead.
 */
export function refusalText(
  slug: string,
  values: Readonly<Record<string, string>>,
  root: string = rootFor(rootsHere(), AKASHA)
): string {
  const at = pageRelIn(root, REFUSAL_TYPE, slug)
  let raw: string
  try {
    raw = readFileSync(`${root}/${at}`, "utf8")
  } catch {
    throw new Error(`${root}/${at} is not there, so there is no refusal to print`)
  }
  const text = raw.replace(/\r\n/g, "\n")
  const closed = text.startsWith(OPENING) ? text.indexOf(CLOSING, OPENING.length) : -1
  const below = closed === -1 ? text : text.slice(closed + CLOSING.length)
  return fill(below.trimStart().replace(HEADING, "").trim(), values)
}
