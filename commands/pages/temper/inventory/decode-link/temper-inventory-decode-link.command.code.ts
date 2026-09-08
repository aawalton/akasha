import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import type { ParsedItemLink } from "@akasha/temper-items-core/item-link-parser"
import { parseItemLink } from "@akasha/temper-items-core/item-link-parser"

const DATA = 2

const JSON_FLAG = "--json"

const FLAG_MARK = "--"

const SPACES = 2

const FIELDS_WANTED = 21

function linkIn(argv: readonly string[]): string | null {
  for (const one of argv) {
    if (one === undefined) continue
    if (one.startsWith(FLAG_MARK)) continue
    return one
  }
  return null
}

function rowsOf(read: ParsedItemLink): readonly string[] {
  const held = Object.entries(read)
  const wide = held.reduce((most, [name]) => (name.length > most ? name.length : most), 0)
  return held.map(([name, value]) => `${name.padEnd(wide)}\t${String(value)}`)
}

export function temperInventoryDecodeLink(argv: readonly string[] = []): Answer {
  const link = linkIn(argv)
  if (link === null) {
    return refused("nothing here names the link read, so there is no link to read", DATA)
  }

  const read = parseItemLink(link)
  if (read === null) {
    return refused(
      `${link} carries no run of at least ${String(FIELDS_WANTED)} fields after an item marker, so reading it partway would report fields it never carried`,
      DATA
    )
  }

  if (argv.includes(JSON_FLAG)) {
    return { report: JSON.stringify(read, null, SPACES).split("\n"), refusals: [], code: 0 }
  }

  return { report: [...rowsOf(read)], refusals: [], code: 0 }
}
