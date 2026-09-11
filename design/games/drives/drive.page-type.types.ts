import type { Octalysis } from "akasha/design/games/drives/properties/octalysis.record-property.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type Drive = Domain & {
  octalysis: Octalysis
}
