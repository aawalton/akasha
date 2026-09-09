import type { TextProperty } from "@akasha/pages/text-property"

export type Pose = string

export const pose = {
  id: "01a0540e-5114-7d4b-aa95-09eb8964df65",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "pose",
  propertySlug: "pose",
  definition: "how a persona is posed and framed at a rung",
  maxLength: 300,
  nameFormat: null,
} as const satisfies TextProperty
