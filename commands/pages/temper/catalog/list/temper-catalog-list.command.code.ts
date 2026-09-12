import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperCatalogList as page } from "akasha/commands/pages/temper/catalog/list/temper-catalog-list.command.ts"
import { CATALOG_DOMAIN_KEYS } from "akasha/temper/catalog-core/domain-keys/domain-keys.module.code.ts"

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
