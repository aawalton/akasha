import type { CarModel } from "../car-model.page-type.ts"

export const karmaRevero = {
  id: "019e4ae2-2a0a-7d2f-bc23-8e9e2ff9ab15",
  pageTypeSlug: "car-model",
  slug: "karma-revero",
  title: "Revero",
  bodyStyle: "sedan",
  generation: "3rd gen (EREV)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Karma Revero is a luxury plug-in extended-range hybrid sport sedan and the spiritual successor to the 2012 Fisker Karma. The current 3rd-generation Revero, introduced for the 2025 model year and continuing into 2026, swaps the previous BMW-sourced 2.0L generator for a 1.5L turbocharged powerplant feeding a 28 kWh battery and 400 kW dual-motor RWD propulsion, producing 536 hp and ~80 mi of EV-only range. Global production is capped at 160 units. Sources: https://karmaautomotive.com/revero/, https://karmaautomotive.com/news/karma-automotives-new-era-dawns/, https://en.wikipedia.org/wiki/Karma_Revero",
  powertrainOptions: ["PHEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- https://karmaautomotive.com/revero/\n- https://karmaautomotive.com/news/karma-automotives-new-era-dawns/\n- https://en.wikipedia.org/wiki/Karma_Revero\n- https://www.kbb.com/karma/revero/2025/specs/",
  exclusionReason: "All years excluded",
  carMakeSlug: "karma",
} as const satisfies CarModel
