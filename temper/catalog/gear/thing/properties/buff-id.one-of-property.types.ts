import type { MajorBuff } from "akasha/temper/catalog/effect/temper-buff-major/properties/major-buff.relation-property.types.ts"
import type { MinorBuff } from "akasha/temper/catalog/effect/temper-buff-minor/properties/minor-buff.relation-property.types.ts"
import type { OtherBuff } from "akasha/temper/catalog/effect/temper-buff-other/properties/other-buff.relation-property.types.ts"

export type BuffId = MajorBuff | MinorBuff | OtherBuff
