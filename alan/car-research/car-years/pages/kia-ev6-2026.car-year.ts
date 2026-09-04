import type { CarYear } from "../car-year.page-type.ts"

export const kiaEv62026 = {
  id: "019e4ae3-a48f-74a3-8a80-ef7567624187",
  pageTypeSlug: "car-year",
  slug: "kia-ev6-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Carryover year following MY2025 refresh. Trim count consolidated to three families (Light, Wind, GT-Line; GT temporarily not offered as MY2026). Across-the-board MSRP reduction of ~$5,000 per trim. Standard NACS port and CCS1-to-NACS DC fast-charge adapter included (ZEV states). Sources: https://evchargingstations.com/chargingnews/2026-kia-ev6-lower-msrp/ , https://carbuzz.com/2026-kia-ev6-pricing-announced/",
  shortList: false,
  sources:
    "https://www.kia.com/us/en/ev6\nhttps://evchargingstations.com/chargingnews/2026-kia-ev6-lower-msrp/\nhttps://carbuzz.com/2026-kia-ev6-pricing-announced/\nhttps://recharged.com/articles/2026-kia-ev6-buying-guide/",
  exclusionReason: "All trims excluded",
  carModelSlug: "kia-ev6",
} as const satisfies CarYear
