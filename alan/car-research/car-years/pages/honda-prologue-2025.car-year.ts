import type { CarYear } from "../car-year.page-type.ts"

export const hondaPrologue2025 = {
  id: "019e4ae1-9fe4-7086-a60f-43e84bdd5779",
  pageTypeSlug: "car-year",
  slug: "honda-prologue-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "MY2025 lifted EPA range across the board at no MSRP increase: FWD models gained roughly 12 miles vs MY2024 (296 -> 308 mi), AWD models gained 13 miles (281 -> 294 mi), and the AWD-only Elite gained 10 miles (275 -> 283 mi). The increase came from software / motor-control tuning rather than a battery change; the 85 kWh GM/LG NMC pack carried over. Tesla Supercharger access was added in June 2025 via the Honda CCS1-to-NACS adapter ($225 MSRP) — initial DC-fast peak settled around 150-155 kW at suitable stations.\n\nSources:\n- https://electrek.co/2025/03/03/honda-prologue-upgraded-300-mi-range-same-price-2025/\n- https://hondanews.com/en-US/honda-automobiles/releases/release-28556cec8c60d45354dbdd1404014728-building-on-success-2025-honda-prologue-goes-farther\n- https://hondanews.com/en-US/electrification/releases/honda-and-acura-ev-owners-now-have-access-to-tesla-supercharger-network-with-approved-adapters",
  shortList: false,
  sources:
    "- https://www.edmunds.com/honda/prologue/2025/\n- https://electrek.co/2025/03/03/honda-prologue-upgraded-300-mi-range-same-price-2025/\n- https://hondanews.com/en-US/honda-automobiles/releases/release-28556cec8c60d45354dbdd1404014728-building-on-success-2025-honda-prologue-goes-farther",
  exclusionReason: "All trims excluded",
  carModelSlug: "honda-prologue",
} as const satisfies CarYear
