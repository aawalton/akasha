import type { NumberProperty } from "@akasha/pages-system/number-property"

export type RestartForceExitStatus = number

export const restartForceExitStatus = {
  id: "01a06738-9f12-73a0-90cc-37a2bd477895",
  pageTypeSlug: "number-property",
  slug: "restart-force-exit-status",
  propertySlug: "restart-force-exit-status",
  definition: "the exit code a unit is started again on whatever its restart says",
  max: null,
} as const satisfies NumberProperty
