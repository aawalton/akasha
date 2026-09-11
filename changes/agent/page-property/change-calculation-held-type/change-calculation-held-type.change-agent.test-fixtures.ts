import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { listedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"

export const AT = "held/ones/properties/total-remaining.computed-property.ts"

export const APART = "apart/ones/properties/total-remaining.computed-property.ts"

export const CODE = "held/ones/properties/total-remaining.computed-property.code.ts"

export const APART_CODE = "apart/ones/properties/total-remaining.computed-property.code.ts"

export const TYPES_IMPORT =
  'import type { TotalRemaining } from "akasha/held/ones/properties/total-remaining.computed-property.types.ts"'

const REPO = rootOf(import.meta.dir)

export const KIND_AT = `akasha/${listedAt(REPO, "page-type", "computed-property")[0]?.path ?? ""}`
