import type { alertRunbook } from "akasha/infrastructure/alerts/properties/alert-runbook.file-property.ts"

export type AlertRunbook = (typeof alertRunbook.extensions)[number]
