import type { CarModel } from "../car-model.page-type.ts"

export const volvoEx30 = {
  id: "019e4afc-862a-760f-8e12-3fd7ab880e29",
  pageTypeSlug: "car-model",
  slug: "volvo-ex30",
  title: "EX30",
  bodyStyle: "suv",
  generation: "1st gen (SEA platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The EX30 is Volvo's subcompact BEV — its smallest, cheapest, and most efficient electric car. Built on Geely's SEA platform (shared with smart #1, Zeekr X), originally manufactured in Zhangjiakou, China. Tariff exposure (Section 301 + 2025 Trump-era escalations) pushed production for the US market to Ghent, Belgium starting April 2025. Despite that, in March 2026 Volvo announced it will end US sales of the EX30 (and the upcoming EX30 Cross Country) at the end of the 2026 model year, citing the cumulative tariff and demand environment rather than any single factor. MY2025 US shipments were Twin Motor Performance only; MY2026 added Single Motor and Cross Country variants for the final year. Sources: https://www.volvocars.com/us/cars/ex30-electric/, https://www.wardsauto.com/news/volvo-ends-EX30-sales-us-2026/815160/, https://www.greencarreports.com/news/1143648_volvo-ex30-delayed-until-2025-in-us-due-to-tariffs",
  powertrainOptions: ["BEV"],
  segment: "luxury-compact",
  shortList: true,
  sources:
    "- https://www.volvocars.com/us/cars/ex30-electric/specifications/\n- https://insideevs.com/news/702527/2025-volvo-ex30-range-specs-pricing/\n- https://www.wardsauto.com/news/volvo-ends-EX30-sales-us-2026/815160/",
  carMakeSlug: "volvo",
} as const satisfies CarModel
