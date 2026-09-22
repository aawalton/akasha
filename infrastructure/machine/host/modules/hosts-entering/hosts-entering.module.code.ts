import { readFileSync } from "node:fs"
import {
  indexThere,
  readingIn,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const A_HOST = "host"

const ANSWERS_AT = "address"

const NAMED = "title"

const A_SHELL = "sh"

const READ_BY = "-c"

const A_HASH = "#"

const APPENDING = "printf '%s\\n' \"$0\" >> "

const BETWEEN = /\s+/

export const HOSTS_AT = "/etc/hosts"

export type Entry = {
  readonly page: string
  readonly name: string
  readonly address: string
}

export function entriesIn(root: string): readonly Entry[] {
  const reading = readingIn(root)
  if (!indexThere(reading)) return []
  const entries: Entry[] = []
  for (const one of valuesOfType(reading, A_HOST)) {
    const address = textAt(one.value, ANSWERS_AT)
    const name = textAt(one.value, NAMED)
    if (address === null || address === "" || name === null || name === "") continue
    entries.push({ page: one.path, name, address })
  }
  return entries
}

export function lineOf(entry: Entry): string {
  return `${entry.address} ${entry.name}`
}

export function bodyAt(at: string = HOSTS_AT): string {
  try {
    return readFileSync(at, "utf8")
  } catch {
    return ""
  }
}

function wordsIn(line: string): readonly string[] {
  const said = line.split(A_HASH)[0] ?? ""
  return said
    .trim()
    .split(BETWEEN)
    .filter((one) => one !== "")
}

export function answeringIn(body: string, name: string): string | null {
  const wanted = name.toLowerCase()
  for (const line of body.split("\n")) {
    const words = wordsIn(line)
    const address = words[0]
    if (address === undefined) continue
    if (words.slice(1).some((one) => one.toLowerCase() === wanted)) return address
  }
  return null
}

export function callsFor(entry: Entry, at: string = HOSTS_AT): readonly (readonly string[])[] {
  return [[A_SHELL, READ_BY, `${APPENDING}${at}`, lineOf(entry)]]
}
