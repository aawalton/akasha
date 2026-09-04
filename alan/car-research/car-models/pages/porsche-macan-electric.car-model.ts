import type { CarModel } from "../car-model.page-type.ts"

export const porscheMacanElectric = {
  id: "019e4af6-5086-70b7-869c-bd64cdbcd527",
  pageTypeSlug: "car-model",
  slug: "porsche-macan-electric",
  title: "Macan Electric",
  bodyStyle: "suv",
  generation: "2nd gen (BEV-only, PPE platform, codename E3)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Porsche Macan Electric is the all-new second-generation Macan, replacing the ICE Macan in the US lineup (the ICE Macan was discontinued in Europe MY25 due to UNECE R155 cybersecurity regs; US dealers cleared remaining ICE Macan stock through 2024). The Macan Electric is built on the Audi/Porsche PPE (Premium Platform Electric) 800-volt architecture, shared with the Audi Q6 e-tron. Four trims for MY2025 US launch: Macan ($75,300), Macan 4 ($78,800), Macan 4S ($86,200 — added late 2024), Macan Turbo ($106,950). 100 kWh gross / 95 kWh usable NMC battery, up to 270 kW DC fast charging, EPA range up to 308 mi (Macan RWD). 800V architecture enables high charge rates. MY2026 is a carryover year with minor MSRP and option updates.\n\nSources:\n- https://www.porsche.com/usa/models/macan/macan-electric-models/\n- https://newsroom.porsche.com/en_US/products/macan/macan-electric-world-premiere-2024-35067.html\n- https://www.caranddriver.com/porsche/macan-electric\n- https://insideevs.com/news/702456/2025-porsche-macan-electric-pricing/",
  powertrainOptions: ["BEV"],
  segment: "luxury-compact",
  shortList: false,
  sources:
    "- https://www.porsche.com/usa/models/macan/macan-electric-models/\n- https://www.fueleconomy.gov/feg/PowerSearch.do?action=noform&path=1&year1=2025&year2=2025&make=Porsche&baseModel=Macan%20Electric\n- https://www.caranddriver.com/porsche/macan-electric/specs",
  exclusionReason: "All years excluded",
  carMakeSlug: "porsche",
} as const satisfies CarModel
