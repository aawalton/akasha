import type { TemperSet } from "../../temper-set.page-type.ts"

export const infallibleMage = {
  id: "01a05fda-f7ef-72db-895a-15f6aa145a43",
  pageTypeSlug: "temper-set",
  slug: "infallible-mage",
  title: "Infallible Mage",
  key: "infallible-mage",
  esoSetId: 172,
  subcategoryId: "trial",
  valid: ["*:light"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
