import { readFileSync } from "node:fs"
import { placeDirOf } from "../../page/page-types.ts"
import { AKASHA, rootFor, rootsHere } from "../../repo/roots/roots.ts"

const REFUSAL_DIR = placeDirOf("refusal")

const REFUSAL_SUFFIX = ".refusal.md"

const OPENING = "---\n"

const CLOSING = "\n---\n"

const HEADING = /^#[^\n]*\n/

const HOLE = /\{([^{}]*)\}/g

function filled(body: string, values: Readonly<Record<string, string>>): string {
  const used = new Set<string>()
  const text = body.replace(HOLE, (whole, name: string) => {
    const value = values[name]
    if (value === undefined) {
      throw new Error(`\`{${name}}\` is marked in the body and no value was handed over`)
    }
    used.add(name)
    return value
  })
  const surplus = Object.keys(values).filter((name) => !used.has(name))
  if (surplus.length > 0) {
    const named = surplus.map((name) => `\`${name}\``).join(", ")
    throw new Error(`${named} was handed over and the body marks no such hole`)
  }
  return text
}

export function refusalText(slug: string, values: Readonly<Record<string, string>>): string {
  const root = rootFor(rootsHere(), AKASHA)
  if (root === undefined) {
    throw new Error(`the ${AKASHA} repository is not cloned here, so there is no refusal to print`)
  }
  const at = `${root}/${REFUSAL_DIR}/${slug}${REFUSAL_SUFFIX}`
  let raw: string
  try {
    raw = readFileSync(at, "utf8")
  } catch {
    throw new Error(`${at} is not there, so there is no refusal to print`)
  }
  const text = raw.replace(/\r\n/g, "\n")
  const closed = text.startsWith(OPENING) ? text.indexOf(CLOSING, OPENING.length) : -1
  const below = closed === -1 ? text : text.slice(closed + CLOSING.length)
  return filled(below.trimStart().replace(HEADING, "").trim(), values)
}
