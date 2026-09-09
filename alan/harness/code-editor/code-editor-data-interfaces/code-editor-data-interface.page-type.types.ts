import type { AmbientTypes } from "../../../../code-system/type-declarations/properties/ambient-types.file-property.ts"
import type { Domain } from "../../../../domains/domain.page-type.ts"
import type { CooldownMilliseconds } from "./properties/cooldown-milliseconds.number-property.ts"
import type { State } from "./properties/state.file-property.ts"

export type CodeEditorDataInterface = Domain & {
  cooldownMilliseconds: CooldownMilliseconds
  d: AmbientTypes
  state?: State
}
