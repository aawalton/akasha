import type { lockState } from "akasha/alan/harness/idle-system/idle-persona-cards/properties/lock-state.select-property.ts"

export type LockState = (typeof lockState.values)[number]
