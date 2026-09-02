import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Delay = number

export const delay = {
  id: "01a06193-6ca8-7884-956b-237d461f1c14",
  pageTypeSlug: "number-property",
  slug: "delay",
  propertySlug: "delay",
  definition: "how many seconds pass before a delayed effect fires",
  max: null,
} as const satisfies NumberProperty
