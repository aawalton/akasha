import type { SelectProperty } from "@akasha/pages-system/select-property"

export const appearanceVerdict = {
  id: "01a0685d-b81f-78c9-9b3a-ff743482a129",
  pageTypeSlug: "select-property",
  slug: "appearance-verdict",
  propertySlug: "verdict",
  definition: "what an experiment leaves Alan doing with the thing next",
  values: ["keep", "tweak", "drop"],
} as const satisfies SelectProperty

export type AppearanceVerdict = (typeof appearanceVerdict.values)[number]
