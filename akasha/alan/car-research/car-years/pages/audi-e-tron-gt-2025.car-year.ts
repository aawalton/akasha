import type { CarYear } from "../car-year.page-type.ts"

export const audiETronGt2025 = {
  id: "019e4ae3-b47c-736d-8584-dee4ec6a2c5f",
  pageTypeSlug: "car-year",
  slug: "audi-e-tron-gt-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Mid-cycle product improvement. New trim hierarchy: S e-tron GT Premium Plus ($125,500), S e-tron GT Prestige ($135,800), RS e-tron GT Performance ($167,000). Upgraded 97 kWh net battery, faster charging, new permanent-magnet motors, revised exterior and interior. RS Performance gains push-to-pass boost, all-wheel-steering, adaptive air suspension. NACS adapter port-installed from Sept 2025. Sources: https://media.audiusa.com/models/e-tron-gt-rs-e-tron-gt ; https://cars.usnews.com/cars-trucks/audi/e-tron-gt ; https://media.audiusa.com/releases/643",
  shortList: false,
  sources:
    "- https://media.audiusa.com/models/e-tron-gt-rs-e-tron-gt\n- https://cars.usnews.com/cars-trucks/audi/e-tron-gt\n- https://media.audiusa.com/releases/643",
  exclusionReason: "All trims excluded",
  carModelSlug: "audi-e-tron-gt",
} as const satisfies CarYear
