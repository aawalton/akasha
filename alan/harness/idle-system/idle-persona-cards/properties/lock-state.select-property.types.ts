import type { lockState } from "./lock-state.select-property.ts"

export type LockState = (typeof lockState.values)[number]
