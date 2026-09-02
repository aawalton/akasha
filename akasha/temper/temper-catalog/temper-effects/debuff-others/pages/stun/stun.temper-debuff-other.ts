import type { TemperDebuffOther } from "../../temper-debuff-other.page-type.ts"

export const stun = {
  id: "01a05fc6-42ca-7e93-b928-e3b3aa3cbb42",
  pageTypeSlug: "temper-debuff-other",
  slug: "stun",
  title: "Stun",
  key: "stun",
  description: "Target is stunned and cannot take actions",
} as const satisfies TemperDebuffOther
