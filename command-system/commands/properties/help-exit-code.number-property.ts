import type { NumberProperty } from "@akasha/pages-system/number-property"

export type HelpExitCode = number

export const helpExitCode = {
  id: "01a06958-32b8-793c-8a51-1e296e21fca3",
  pageTypeSlug: "number-property",
  slug: "help-exit-code",
  propertySlug: "code",
  definition: "the number a command exits with",
  max: null,
} as const satisfies NumberProperty
