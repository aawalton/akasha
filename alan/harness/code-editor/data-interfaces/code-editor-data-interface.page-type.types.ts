import type { CooldownMilliseconds } from "akasha/alan/harness/code-editor/data-interfaces/properties/cooldown-milliseconds.number-property.types.ts"
import type { State } from "akasha/alan/harness/code-editor/data-interfaces/properties/state.file-property.types.ts"
import type { AmbientTypes } from "akasha/code-system/type-declarations/properties/ambient-types.file-property.types.ts"
import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export type CodeEditorDataInterface = Domain & {
  cooldownMilliseconds: CooldownMilliseconds
  d: AmbientTypes
  state?: State
}
