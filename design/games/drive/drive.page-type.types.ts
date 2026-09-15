import type { Octalysis } from "akasha/design/games/drive/properties/octalysis.record-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type Drive = Domain & {
  octalysis: Octalysis
}
