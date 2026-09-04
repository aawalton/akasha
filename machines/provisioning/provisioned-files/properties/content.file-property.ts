import type { FileProperty } from "@akasha/pages-system/file-property"

export type Content = "sh" | "conf" | "json"

export const content = {
  id: "01a06861-49aa-7da0-ac90-203f33e32ff4",
  pageTypeSlug: "file-property",
  slug: "content",
  propertySlug: "content",
  definition: "the body a provisioned file is put in place with",
} as const satisfies FileProperty
