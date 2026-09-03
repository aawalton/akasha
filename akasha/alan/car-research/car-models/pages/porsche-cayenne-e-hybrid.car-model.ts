import type { CarModel } from "../car-model.page-type.ts"

export const porscheCayenneEHybrid = {
  id: "019e4af8-c19f-7724-986c-17e86f058579",
  pageTypeSlug: "car-model",
  slug: "porsche-cayenne-e-hybrid",
  title: "Cayenne E-Hybrid",
  bodyStyle: "suv",
  generation: "3rd gen (PO536), 2024 mid-cycle refresh",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Porsche Cayenne PHEV lineup includes the Cayenne E-Hybrid (base PHEV), Cayenne S E-Hybrid (added MY24, V6+motor), and Cayenne Turbo E-Hybrid (V8 + motor, replaces Turbo S E-Hybrid coupe). All share a 25.9 kWh gross / 21.8 kWh usable battery — substantially larger than the prior 17.9 kWh battery — giving roughly 26-30 mi of EPA-rated electric-only range. Available in both SUV body and Cayenne Coupe (lower roofline, fastback). The PHEV uses an 11 kW AC on-board charger. The Cayenne ICE-only trims continue alongside. Porsche's next-gen Cayenne BEV is due 2026 but the PHEV/ICE Cayenne will be sold in parallel for several years. Cayenne PHEV is built in Bratislava, Slovakia.\n\nSources:\n- https://www.porsche.com/usa/models/cayenne/cayenne-models/\n- https://newsroom.porsche.com/en_US/products/cayenne/cayenne-2024-update-32841.html\n- https://www.caranddriver.com/porsche/cayenne\n- https://www.fueleconomy.gov/feg/Find.do?action=sbs&id=46735",
  powertrainOptions: ["PHEV", "ICE"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- https://www.porsche.com/usa/models/cayenne/cayenne-e-hybrid-models/\n- https://www.fueleconomy.gov/feg/PowerSearch.do?action=noform&path=1&year1=2025&year2=2025&make=Porsche&baseModel=Cayenne\n- https://www.caranddriver.com/porsche/cayenne/specs",
  exclusionReason: "All years excluded",
  carMakeSlug: "porsche",
} as const satisfies CarModel
