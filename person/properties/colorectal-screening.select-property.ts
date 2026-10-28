import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const colorectalScreening = {
  id: "01a183f0-a7c1-7d8a-aec4-df05bf32605d",
  type: "page-type/select-property",
  slug: "colorectal-screening",
  propertySlug: "colorectal-screening",
  definition: "how a person is screened for colorectal cancer",
  values: ["none", "fit-yearly", "colonoscopy-10-yearly"],
  types: "ts",
  createdAt: "2026-10-28T19:15:49.311Z",
  updatedAt: "2026-10-28T19:15:49.311Z",
} as const satisfies SelectProperty
