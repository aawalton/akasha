import type { TemperSet } from "../../temper-set.page-type.ts"

export const sharedBurden = {
  id: "01a05fdc-9734-7d81-84b9-9f7322163d96",
  pageTypeSlug: "temper-set",
  slug: "shared-burden",
  title: "Shared Burden",
  key: "shared-burden",
  esoSetId: 808,
  subcategoryId: "no-type",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
