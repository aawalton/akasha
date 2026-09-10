import type { runStatus } from "./run-status.select-property.ts"

export type RunStatus = (typeof runStatus.values)[number]
