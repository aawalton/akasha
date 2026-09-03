import type { CarModel } from "../car-model.page-type.ts"

export const kiaNiroPlugInHybrid = {
  id: "019e4ae9-f859-77e4-a54c-ea3587952088",
  pageTypeSlug: "car-model",
  slug: "kia-niro-plug-in-hybrid",
  title: "Niro Plug-in Hybrid",
  bodyStyle: "crossover",
  generation:
    "2nd gen (SG2); shared with Niro EV/Hybrid; 1.6L Atkinson + 11.1 kWh battery PHEV powertrain",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Niro Plug-in Hybrid is Kia's compact PHEV crossover, built on the same body as the Niro EV and Hybrid. The PHEV system pairs the 1.6L Atkinson engine with a larger electric motor and an 11.1 kWh battery for ~33 mi of EPA all-electric range plus 48 mpg combined hybrid mode. EV and SX Touring trims for MY2025 ($35,865 / $42,165); MY2026 is essentially carryover. SX Touring includes a Cold Weather package (heated rear seats, auxiliary heater) standard. Sources: https://www.kia.com/us/en/niro-plug-in-hybrid , https://www.edmunds.com/kia/niro-plug-in-hybrid/2025/trims/",
  powertrainOptions: ["PHEV"],
  segment: "subcompact",
  shortList: false,
  sources:
    "https://www.kia.com/us/en/niro-plug-in-hybrid\nhttps://www.kia.com/us/en/niro-plug-in-hybrid/specs-compare\nhttps://www.kbb.com/kia/niro-plug-in-hybrid/2025/specs/\nhttps://cars.usnews.com/cars-trucks/kia/niro-plug-in-hybrid",
  exclusionReason: "All years excluded",
  carMakeSlug: "kia",
} as const satisfies CarModel
