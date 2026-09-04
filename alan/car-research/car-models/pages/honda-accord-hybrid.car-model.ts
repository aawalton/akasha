import type { CarModel } from "../car-model.page-type.ts"

export const hondaAccordHybrid = {
  id: "019e4ae0-ffdb-7974-ada4-218c94c57ea6",
  pageTypeSlug: "car-model",
  slug: "honda-accord-hybrid",
  title: "Accord Hybrid",
  bodyStyle: "sedan",
  generation: "11th gen (CY chassis, debuted MY2023)",
  modelYearsAvailable: "2023, 2024, 2025, 2026",
  overview:
    "The Accord Hybrid is the hybrid-electric variant of Honda's 11th-generation midsize sedan, introduced for MY2023. It uses Honda's two-motor hybrid system (e:HEV) — a 2.0L Atkinson-cycle four with two electric motors producing 204 hp and 247 lb-ft combined. Honda reports that hybrid variants now exceed 50% of Accord sales, making it the volume powertrain. Four hybrid trims (Sport, EX-L, Sport-L, Touring) are offered alongside two non-hybrid LX/SE turbo trims. EPA fuel economy peaks at 51/44 city/highway for EX-L (lighter wheels) and 46/41 for the Sport/Sport-L/Touring (19\" wheels). The Accord Hybrid was named one of U.S. News & World Report's 'Best Cars for Families' for 2026. MY2026 brings standard 9-inch infotainment, wireless CarPlay/Android Auto, and wireless charging across the lineup, plus blacked-out trim accents on Sport / Sport-L.\n\nSources:\n- https://hondanews.com/en-US/honda-automobiles/releases/release-c26685400737027f7d053958c30909ed-2026-honda-accord-adds-more-standard-tech-and-sportier-styling-now-arriving-at-dealers\n- https://hondanews.com/en-US/honda-automobiles/releases/release-092e79af5ede421218b6c46b88000932-2026-honda-accord-accord-hybrid-passport-and-ridgeline-named-best-cars-for-families-by-us-news-world-report\n- https://automobiles.honda.com/accord-sedan",
  powertrainOptions: ["HEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- https://automobiles.honda.com/accord-sedan\n- https://www.edmunds.com/honda/accord/2025/hybrid/\n- https://www.edmunds.com/honda/accord/2026/hybrid/\n- https://hondanews.com/en-US/honda-automobiles/releases/release-c26685400737027f7d053958c30909ed-2026-honda-accord-adds-more-standard-tech-and-sportier-styling-now-arriving-at-dealers",
  exclusionReason: "All years excluded",
  carMakeSlug: "honda",
} as const satisfies CarModel
