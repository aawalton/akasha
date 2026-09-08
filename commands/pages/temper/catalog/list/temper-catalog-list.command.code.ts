import type { Answer } from "@akasha/command-system/calling"
import { CATALOG_DOMAIN_KEYS } from "@akasha/temper-catalog-core/domain-keys"

const JSON_FLAG = "--json"

const SPACES = 2

const HEADING = "key"

export function temperCatalogList(argv: readonly string[] = []): Answer {
  const domains = [...CATALOG_DOMAIN_KEYS]

  if (argv.includes(JSON_FLAG)) {
    return { report: JSON.stringify({ domains }, null, SPACES).split("\n"), refusals: [], code: 0 }
  }

  return { report: [HEADING, ...domains], refusals: [], code: 0 }
}
