import type { Domain } from "../../../domains/domain.page-type.types.ts"
import type { Octalysis } from "./properties/octalysis.record-property.ts"

export type Drive = Domain & {
  octalysis: Octalysis
}
