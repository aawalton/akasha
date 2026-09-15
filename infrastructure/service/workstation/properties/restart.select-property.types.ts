import type { restart } from "akasha/infrastructure/service/workstation/properties/restart.select-property.ts"

export type Restart = (typeof restart.values)[number]
