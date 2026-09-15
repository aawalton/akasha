import {
  PAGE_TYPE,
  RECORD,
  TEXT,
} from "akasha/check/code/pages/key-names-one-property/key-names-one-property.check-code.decision.test-fixtures.ts"
import {
  declaring,
  founded,
  typed,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"

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
