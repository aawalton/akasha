import type { CarYear } from "../car-year.page-type.ts"

export const karmaRevero2025 = {
  id: "019e4ae2-9c2a-7a1c-bf4b-0e931c130262",
  pageTypeSlug: "car-year",
  slug: "karma-revero-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "Launch year of the 3rd-generation Revero EREV platform — full redesign vs the 2nd-gen Revero GT (discontinued mid-2024). New 1.5L turbo generator (replaces BMW 2.0L), new 28 kWh battery pack, dual-motor 400 kW RWD propulsion (536 hp / 550 lb-ft), and a Rightware Kanzi digital cockpit refresh. Limited to 160 units globally across the production run. Sources: https://karmaautomotive.com/news/karma-automotives-new-era-dawns/, https://en.wikipedia.org/wiki/Karma_Revero",
  shortList: false,
  sources:
    "- https://karmaautomotive.com/news/karma-automotives-new-era-dawns/\n- https://en.wikipedia.org/wiki/Karma_Revero\n- https://www.kbb.com/karma/revero/2025/specs/",
  exclusionReason: "All trims excluded",
  carModelSlug: "karma-revero",
} as const satisfies CarYear
