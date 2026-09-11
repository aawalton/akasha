import type { runStatus } from "akasha/alan/collections/sync-runs/properties/run-status.select-property.ts"

export type RunStatus = (typeof runStatus.values)[number]
