import {
  PAGE_TYPE,
  RECORD,
  TEXT,
} from "akasha/checks/code-checks/pages/key-names-one-property/key-names-one-property.code-check.decision.test-fixtures.ts"
import {
  declaring,
  founded,
  typed,
} from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

export const scratch = scratchWorld()

export function rooted(): string {
  const root = scratch.rootFor("akasha-restated-")
  founded(root)
  typed(root, "domain", "page")
  typed(root, "page-property", "domain")
  typed(root, TEXT, "page-property")
  typed(root, RECORD, "page-property")
  typed(root, PAGE_TYPE, "domain")
  declaring(root, "properties", { pageTypeSlug: RECORD })
  declaring(root, "held", { pageTypeSlug: TEXT })
  return root
}
