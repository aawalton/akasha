import { takenFor } from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import { json } from "akasha/command/arguments/pages/json.argument.ts"
import { told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { temperCatalogList as page } from "akasha/command/pages/temper/catalog/list/temper-catalog-list.command.ts"
import { CATALOG_DOMAIN_KEYS } from "akasha/temper/catalog-core/modules/domain-keys/domain-keys.module.code.ts"

const NAMED = [json]

const SPACES = 2

const HEADING = "key"

export function temperCatalogList(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const domains = [...CATALOG_DOMAIN_KEYS]

  if (read.taken.json) {
    return told(JSON.stringify({ domains }, null, SPACES).split("\n"))
  }

  return told([HEADING, ...domains])
}
