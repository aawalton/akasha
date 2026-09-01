import type { TextProperty } from "@akasha/pages-system/text-property"

export type Pose = string

export const pose = {
  id: "01a0540e-5114-7d4b-aa95-09eb8964df65",
  pageTypeSlug: "text-property",
  slug: "pose",
  propertySlug: "pose",
  definition: "how a persona is posed and framed at a rung",
  max: 300,
  nameFormatSlug: null,
} as const satisfies TextProperty
