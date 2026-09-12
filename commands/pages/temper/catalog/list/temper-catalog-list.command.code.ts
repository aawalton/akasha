import { OK } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { CATALOG_DOMAIN_KEYS } from "akasha/temper/catalog-core/domain-keys/domain-keys.module.code.ts"

const JSON_FLAG = "--json"

const SPACES = 2

const HEADING = "key"

export function temperCatalogList(argv: readonly string[] = []): Answer {
  const domains = [...CATALOG_DOMAIN_KEYS]

  if (argv.includes(JSON_FLAG)) {
    return { report: JSON.stringify({ domains }, null, SPACES).split("\n"), refusals: [], code: OK }
  }

  return { report: [HEADING, ...domains], refusals: [], code: OK }
}
