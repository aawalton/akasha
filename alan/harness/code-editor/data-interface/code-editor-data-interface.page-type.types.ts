import type { CooldownMilliseconds } from "akasha/alan/harness/code-editor/data-interface/properties/cooldown-milliseconds.number-property.types.ts"
import type { Rows } from "akasha/alan/harness/code-editor/data-interface/properties/rows.file-property.types.ts"
import type { State } from "akasha/alan/harness/code-editor/data-interface/properties/state.file-property.types.ts"
import type { AmbientTypes } from "akasha/code/type-declaration/properties/ambient-types.file-property.types.ts"
import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export type CodeEditorDataInterface = Domain & {
  cooldownMilliseconds: CooldownMilliseconds
  d: AmbientTypes
  state?: State
  rows?: Rows
}
