import type { TemperSet } from "../../temper-set.page-type.ts"

export const vengeanceLeech = {
  id: "01a05fde-b3c0-7266-bd5f-35b54bf1728e",
  pageTypeSlug: "temper-set",
  slug: "vengeance-leech",
  title: "Vengeance Leech",
  key: "vengeance-leech",
  esoSetId: 129,
  subcategoryId: "pvp",
  valid: ["weapon:*", "jewelry:*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
