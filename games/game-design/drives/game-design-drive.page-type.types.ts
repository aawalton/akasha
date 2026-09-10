import type { Domain } from "../../../domains/domain.page-type.ts"
import type { Octalysis } from "./properties/octalysis.record-property.ts"

export type GameDesignDrive = Domain & {
  octalysis: Octalysis
}
