import type { CarYear } from "../car-year.page-type.ts"

export const hondaPrologue2026 = {
  id: "019e4ae1-c19e-7bd4-8693-835e7bb5d34e",
  pageTypeSlug: "car-year",
  slug: "honda-prologue-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "MY2026 brought a roughly $7,500 across-the-board price cut, partially offsetting the September-30-2025 sunset of the federal EV tax credit (EX FWD $47,400 -> $39,990; Elite $57,900 -> $50,400). No design or powertrain changes — same 85 kWh Ultium pack, same EPA range (up to 308 mi FWD / 294 mi AWD / 283 mi Elite). Every Prologue now ships with a Portable Charging Kit standard; buyers also choose between a $1,250 home-charger installation incentive or a $500 sales credit via Honda Home Electrification. Paint palette change: Frostline White Pearl replaces Snowfall Pearl. The Honda CCS1-to-NACS adapter is included or sold separately depending on the dealer package; native NACS is not present (will arrive on Honda 0 Series in 2026, not the GM-platform Prologue).\n\nSources:\n- https://www.autoevolution.com/news/2026-honda-prologue-quietly-receives-7500-price-cut-268331.html\n- https://hondanews.com/en-US/honda-automobiles/releases/release-8fa536ee8b843d5cf766c58616009076-2026-honda-prologue-pricing-and-epa-ratings",
  shortList: false,
  sources:
    "- https://automobiles.honda.com/prologue\n- https://hondanews.com/en-US/honda-automobiles/releases/release-8fa536ee8b843d5cf766c58616009076-2026-honda-prologue-pricing-and-epa-ratings\n- https://www.edmunds.com/honda/prologue/\n- https://www.autoevolution.com/news/2026-honda-prologue-quietly-receives-7500-price-cut-268331.html",
  exclusionReason: "All trims excluded",
  carModelSlug: "honda-prologue",
} as const satisfies CarYear
