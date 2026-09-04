import type { CarModel } from "../car-model.page-type.ts"

export const audiA3 = {
  id: "019e4ad6-5386-7e59-be40-d5f8716cc28d",
  pageTypeSlug: "car-model",
  slug: "audi-a3",
  title: "A3",
  bodyStyle: "sedan",
  generation: "4th gen (8Y, facelift 2025)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The A3 is Audi's entry-level compact luxury sedan, slotting below the A4/A5. For US MY2025 and MY2026, every A3 ships standard with a 48-volt mild-hybrid (MHEV) system bolted to the 2.0L TFSI four-cylinder and 7-speed DCT (quattro AWD). The 48V system supports stop/start, mild electric assist, and short coast-down engine-off events but is not capable of pure-EV propulsion. The advanced MHEV plus system on the European A5/Q5 is not offered in the US. Sources: https://www.cargurus.com/research/articles/2025-audi-a3-pricing-specs-release-date ; https://www.consumerreports.org/cars/audi/a3/2025/road-test-report/ ; https://www.audivannuys.com/en/research/2026-audi-a3-overview/",
  powertrainOptions: ["MHEV"],
  segment: "luxury-compact",
  shortList: false,
  sources:
    "- https://www.audiusa.com/en/models/a3/\n- https://www.cargurus.com/research/articles/2025-audi-a3-pricing-specs-release-date\n- https://www.consumerreports.org/cars/audi/a3/2025/road-test-report/\n- https://www.audivannuys.com/en/research/2026-audi-a3-overview/",
  exclusionReason: "All years excluded",
  carMakeSlug: "audi",
} as const satisfies CarModel
