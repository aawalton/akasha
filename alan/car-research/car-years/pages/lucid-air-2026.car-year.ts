import type { CarYear } from "../car-year.page-type.ts"

export const lucidAir2026 = {
  id: "019e4aeb-0eae-7cec-b4c7-f8679566172d",
  pageTypeSlug: "car-year",
  slug: "lucid-air-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "Key 2026 refresh: (1) All Air owners (including 2026) gained access to the Tesla Supercharger network via Lucid's $220 DC NACS-to-CCS1 adapter starting July 31, 2025; the 2026 Air still has a CCS1 port. (2) A major DreamDrive driver-assistance update (hands-off Highway Assist enhancements via OTA). (3) Touring trim: new wheels and a more efficient air-conditioning compressor (sourced from Gravity) yielded slightly more EPA range. (4) Pricing: Pure $70,900, Touring increased, Grand Touring and Sapphire continue. (5) Continued software refinement via OTA.\n\nSources:\n- https://lucidmotors.com/stories/2026-lucid-air-tesla-superchargers\n- https://ir.lucidmotors.com/news-releases/news-release-details/all-lucid-airs-gain-access-23500-tesla-superchargers-2026-lucid/\n- https://cars.usnews.com/cars-trucks/lucid/air",
  shortList: false,
  sources:
    "- https://lucidmotors.com/air\n- https://cars.usnews.com/cars-trucks/lucid/air\n- https://lucidmotors.com/stories/2026-lucid-air-tesla-superchargers",
  exclusionReason: "All trims excluded",
  carModelSlug: "lucid-air",
} as const satisfies CarYear
