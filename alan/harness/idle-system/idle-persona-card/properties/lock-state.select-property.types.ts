import type { lockState } from "akasha/alan/harness/idle-system/idle-persona-card/properties/lock-state.select-property.ts"

export type LockState = (typeof lockState.values)[number]
