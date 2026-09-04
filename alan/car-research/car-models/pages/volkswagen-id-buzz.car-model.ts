import type { CarModel } from "../car-model.page-type.ts"

export const volkswagenIdBuzz = {
  id: "019e4afc-15d9-7521-9420-b66c8bd74491",
  pageTypeSlug: "car-model",
  slug: "volkswagen-id-buzz",
  title: "ID. Buzz",
  bodyStyle: "van",
  generation: "1st gen (MEB platform, long-wheelbase US-spec)",
  modelYearsAvailable: "2025",
  overview:
    "The ID. Buzz is Volkswagen's electric 3-row passenger van, a spiritual successor to the Type 2 Microbus, built on the MEB platform with an extended wheelbase for the US market versus the shorter Euro-spec. The US-market ID. Buzz launched for MY2025 only — Volkswagen confirmed in early 2026 that there will be NO MY2026 US ID. Buzz; the brand cited weak sales tied to high pricing ($61k-$71k MSRP) and intends to return with a refreshed MY2027. As a result, only the 2025 model year is in scope here. Trims: Pro S, Pro S Plus, and 1st Edition, each with optional 4MOTION AWD. All trims share the 91 kWh battery and a 200 kW DC fast-charge peak. Sources: https://www.vw.com/en/models/id-buzz.html ; https://www.cars.com/articles/volkswagen-id-buzz-skips-u-s-market-for-2026-519884/ ; https://www.edmunds.com/volkswagen/id-buzz/",
  powertrainOptions: ["BEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- https://www.vw.com/en/models/id-buzz.html\n- https://www.edmunds.com/volkswagen/id-buzz/\n- https://www.cars.com/articles/volkswagen-id-buzz-skips-u-s-market-for-2026-519884/\n- https://media.vw.com/releases/1894\n- https://www.vw.com/idhub/content/dam/onehub_pkw/importers/us/en/showrooms/id-buzz/2025/tech-specs/ID_Buzz_Pro_S_Technical_Data.pdf",
  exclusionReason: "All years excluded",
  carMakeSlug: "volkswagen",
} as const satisfies CarModel
