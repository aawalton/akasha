import type { CarModel } from "../car-model.page-type.ts"

export const fiat500e = {
  id: "019e4ada-4be3-714d-99ea-fd86ac0a5771",
  pageTypeSlug: "car-model",
  slug: "fiat-500e",
  title: "500e",
  bodyStyle: "hatchback",
  generation: "3rd gen (332)",
  modelYearsAvailable: "2024, 2025, 2026",
  overview:
    "The 500e is Fiat's iconic city EV, a 3rd-generation (chassis code 332) two-door, four-seat subcompact hatchback built on a dedicated Stellantis BEV platform at the Mirafiori plant in Turin, Italy. It is the only Fiat model currently sold new in the US (as of May 2026), having anchored Fiat's late-2023 return to the US market after the brand's 2019 exit. Front-wheel drive, single front-mounted motor (87 kW / 117 hp), 42 kWh battery (≈37 kWh usable), and EPA-rated 141-149 mi range depending on tires. Aimed at urban / second-car buyers, not road-trip use. MY2024 launched with three 'Inspired by' trims; MY2025 consolidated into INSPI(RED) / Icona / Giorgio Armani Collector's Edition (500 units). MY2026 simplified again to Pop / Icona with a substantial price increase ($35,700-$37,700 MSRP, up from $30,500 MSRP in MY25 after the mid-cycle $2,000 cut).\n\nSources:\n- https://www.fiatusa.com/models/500e\n- https://www.carscoops.com/2026/04/fiat-500e-2026-pricing/\n- https://tflcar.com/2026/04/2026-fiat-500e-updates-news/\n- https://moparinsiders.com/is-the-fiat-brand-still-relevant-in-north-america/",
  powertrainOptions: ["BEV"],
  segment: "subcompact",
  shortList: false,
  sources:
    "- https://www.fiatusa.com/models/500e\n- https://www.cars.com/research/fiat-500e-2025/\n- https://www.cars.com/research/fiat-500e-2026/\n- https://www.kbb.com/fiat/500e/2025/\n- https://www.carsdirect.com/automotive-news/2025-fiat-500e-price-cut-by-2-000",
  exclusionReason: "All years excluded",
  carMakeSlug: "fiat",
} as const satisfies CarModel
