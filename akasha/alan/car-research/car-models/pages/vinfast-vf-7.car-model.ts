import type { CarModel } from "../car-model.page-type.ts"

export const vinfastVf7 = {
  id: "019e4afa-7b74-771c-9bfd-ef8840ada48f",
  pageTypeSlug: "car-model",
  slug: "vinfast-vf-7",
  title: "VF 7",
  bodyStyle: "crossover",
  generation: "1st gen (eVS30 platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The VinFast VF 7 is a compact electric crossover with Torino Design-led styling, slotting between the VF 6 and VF 8. US lineup features Eco (FWD, single-motor) and Plus (AWD, dual-motor) trims sharing a 75.3 kWh battery. EPA-rated 209 mi (Plus) per fueleconomy.gov MY2025/2026 listing; manufacturer-quoted 238 mi for Eco. Available for US order through MY2026 with deliveries underway; the VF 7 was officially launched in Vietnam in early 2024 and entered the US lineup as a 2025/2026 offering. Sources: https://vinfastauto.us/vehicles/vf-7 https://www.fueleconomy.gov/feg/PowerSearch.do?action=noform&path=1&year1=2025&year2=2026&make=Vinfast https://vinfastauto.us/newsroom/press-release/vinfast-announces-vf-6-and-vf-7-all-electric-crossover-specs-early",
  powertrainOptions: ["BEV"],
  segment: "compact",
  shortList: false,
  sources:
    "https://vinfastauto.us/vehicles/vf-7 https://www.fueleconomy.gov/feg/PowerSearch.do?action=noform&path=1&year1=2025&year2=2026&make=Vinfast https://greencarscompare.com/car/vinfast-vf-7-plus/ https://greencarscompare.com/car/vinfast-vf-7-eco/",
  exclusionReason: "No US dealer/service network — no Utah presence",
  carMakeSlug: "vinfast",
} as const satisfies CarModel
