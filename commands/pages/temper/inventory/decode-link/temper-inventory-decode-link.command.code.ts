import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { link as linkArgument } from "akasha/commands/arguments/pages/link.argument.ts"
import {
  DATA,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperInventoryDecodeLink as page } from "akasha/commands/pages/temper/inventory/decode-link/temper-inventory-decode-link.command.ts"
import type { ParsedItemLink } from "akasha/temper/items-core/item-link-parser/item-link-parser.module.code.ts"
import { parseItemLink } from "akasha/temper/items-core/item-link-parser/item-link-parser.module.code.ts"

const SPACES = 2

const FIELDS_WANTED = 21

const NAMED = [json, linkArgument]

function rowsOf(read: ParsedItemLink): readonly string[] {
  const held = Object.entries(read)
  const wide = held.reduce((most, [name]) => (name.length > most ? name.length : most), 0)
  return held.map(([name, value]) => `${name.padEnd(wide)}\t${String(value)}`)
}

export function temperInventoryDecodeLink(argv: readonly string[], given: Given): Answer {
  const taking = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in taking) return mistaking(taking.refused)
  const taken = taking.taken

  const read = parseItemLink(taken.link)
  if (read === null) {
    return refused(
      `${taken.link} carries no run of at least ${String(FIELDS_WANTED)} fields after an item marker, so reading it partway would report fields it never carried`,
      DATA
    )
  }

  if (taken.json) {
    return told(JSON.stringify(read, null, SPACES).split("\n"))
  }

  return told(rowsOf(read))
}
