import type { CarModel } from "../car-model.page-type.ts"

export const polestarPolestar2 = {
  id: "019e4af2-a355-7d08-b5ca-1d789a4b80fa",
  pageTypeSlug: "car-model",
  slug: "polestar-polestar-2",
  title: "Polestar 2",
  bodyStyle: "hatchback",
  generation: "1st gen (CMA / Volvo Compact Modular Architecture, RWD/AWD update from MY24)",
  modelYearsAvailable: "2025",
  overview:
    "The Polestar 2 is a battery-electric five-door fastback/liftback sedan, the brand's first volume EV (launched globally 2019, US deliveries from 2020). Built on Volvo's CMA platform alongside the XC40 Recharge, it was significantly re-engineered for MY24 with a switch from front- to rear-biased single-motor drive, a larger 82 kWh battery, more powerful rear motor (299 hp single motor), and faster 205 kW DC charging. For MY25 in the US, Polestar pruned the lineup to a single fully-loaded Long Range Dual Motor Performance Pack trim. The 2 was discontinued from new US sales for MY26 due to US import tariff pressure on the China-built model; a second-generation Polestar 2 is expected for the 2027 model year. Sources: https://www.polestar.com/us/polestar-2/, https://en.wikipedia.org/wiki/Polestar_2, https://insideevs.com/news/787583/polestar-2-new-generation-2027/",
  powertrainOptions: ["BEV"],
  segment: "luxury-compact",
  shortList: false,
  sources:
    "- https://www.polestar.com/us/polestar-2/\n- https://en.wikipedia.org/wiki/Polestar_2\n- https://insideevs.com/news/787583/polestar-2-new-generation-2027/\n- https://www.edmunds.com/polestar/2/2025/\n- https://carbuzz.com/cars/polestar/2/2025/",
  exclusionReason: "All years excluded",
  carMakeSlug: "polestar",
} as const satisfies CarModel
