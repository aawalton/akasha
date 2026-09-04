import type { CarModel } from "../car-model.page-type.ts"

export const vinfastVf8 = {
  id: "019e4afa-9d10-7aff-a560-4efa4fa37a32",
  pageTypeSlug: "car-model",
  slug: "vinfast-vf-8",
  title: "VF 8",
  bodyStyle: "suv",
  generation: "1st gen (eVS37 platform, Pininfarina-designed)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The VinFast VF 8 is the brand's volume mid-size electric SUV and the first VinFast vehicle delivered in the US (March 2023). All US-market VF 8s are dual-motor AWD with an 87.7 kWh battery; the Eco trim is the longer-range/lower-power variant (349 hp, 256 mi EPA), the Plus adds 53 hp for 402 hp total but trades range (235 mi EPA). The VF 8 has been through several aggressive software / pricing iterations and was the subject of an August 2025 ADAS recall (~6,000 vehicles, spurious steering interventions). Sources: https://vinfastauto.us/vehicles/vf-8 https://www.fueleconomy.gov/feg/PowerSearch.do?action=noform&path=1&year1=2025&year2=2026&make=Vinfast https://insideevs.com/news/681603/vinfast-vf8-city-edition-epa-range/",
  powertrainOptions: ["BEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "https://vinfastauto.us/vehicles/vf-8 https://www.fueleconomy.gov/feg/PowerSearch.do?action=noform&path=1&year1=2025&year2=2026&make=Vinfast https://www.kbb.com/vinfast/vf-8/ https://www.edmunds.com/vinfast/vf-8/2025/ https://www.nhtsa.gov/vehicle/2023/VINFAST/VF8 https://www.consumerreports.org/cars/vinfast/vf-8/2025/reliability/",
  exclusionReason: "No US dealer/service network — no Utah presence",
  carMakeSlug: "vinfast",
} as const satisfies CarModel
