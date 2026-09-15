import type { runStatus } from "akasha/alan/collection/sync-run/properties/run-status.select-property.ts"

export type RunStatus = (typeof runStatus.values)[number]
