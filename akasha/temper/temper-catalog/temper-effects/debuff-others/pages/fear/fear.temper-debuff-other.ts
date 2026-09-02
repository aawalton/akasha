import type { TemperDebuffOther } from "../../temper-debuff-other.page-type.ts"

export const fear = {
  id: "01a05fc6-42c8-72c5-af3c-e4d6d6faa057",
  pageTypeSlug: "temper-debuff-other",
  slug: "fear",
  title: "Fear",
  key: "fear",
  description: "Target flees in fear and cannot take actions",
} as const satisfies TemperDebuffOther
