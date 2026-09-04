import type { CarModel } from "../car-model.page-type.ts"

export const porscheTaycan = {
  id: "019e4af2-23c6-718b-94cd-e0b3d6a656ae",
  pageTypeSlug: "car-model",
  slug: "porsche-taycan",
  title: "Taycan",
  bodyStyle: "sedan",
  generation: "J1 platform, 2024 mid-cycle refresh (Gen 1.5)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Porsche Taycan is the brand's first all-electric production vehicle, launched as MY2020 on the 800-volt J1 platform shared (in part) with the Audi e-tron GT. The 2025 model year received a substantial mid-cycle refresh (revealed Feb 2024) with larger 105 kWh gross battery (97 kWh usable on Performance Battery Plus), upgraded inverters, more efficient permanent-magnet rear motor, up to 320 kW DC fast charging (10-80% in ~18 min), increased EPA range (Taycan RWD now up to 318 mi), and revised infotainment. Three body styles in the US lineup: Sedan, Cross Turismo (lifted wagon, AWD only), and Sport Turismo (regular wagon, added back to US for 2024 refresh). Multiple trims from base RWD ($101,395) to range-topping Turbo GT ($231,995). For MY2026, Porsche continues the refreshed Taycan with minor option changes.\n\nSources:\n- https://www.porsche.com/usa/models/taycan/\n- https://newsroom.porsche.com/en_US/products/taycan/taycan-2024-update-35498.html\n- https://www.caranddriver.com/porsche/taycan\n- https://insideevs.com/news/707984/2025-porsche-taycan-revealed-specs/",
  powertrainOptions: ["BEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- https://www.porsche.com/usa/models/taycan/taycan-models/\n- https://www.fueleconomy.gov/feg/PowerSearch.do?action=noform&path=1&year1=2025&year2=2025&make=Porsche&baseModel=Taycan\n- https://www.caranddriver.com/porsche/taycan/specs\n- https://www.edmunds.com/porsche/taycan/2025/",
  exclusionReason: "All years excluded",
  carMakeSlug: "porsche",
} as const satisfies CarModel
