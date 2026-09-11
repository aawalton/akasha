import type { state } from "akasha/alan/harness/code-editor/data-interfaces/properties/state.file-property.ts"

export type State = (typeof state.extensions)[number]
