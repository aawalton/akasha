import type { CarModel } from "../car-model.page-type.ts"

export const bmwIx = {
  id: "019e4ad7-27bc-7b8e-8b21-c4f77fd8613e",
  pageTypeSlug: "car-model",
  slug: "bmw-ix",
  title: "iX",
  bodyStyle: "suv",
  generation: "1st gen (I20, 2022-)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The BMW iX is BMW's flagship all-electric midsize luxury SUV, launched globally in late 2021 and in the US for MY2022. Unlike the i4/i5/i7 which adapt the CLAR platform, the iX uses a bespoke aluminum-and-CFRP architecture purpose-built for EVs. For MY2026 BMW revised the lineup to xDrive45 (new entry trim replacing xDrive50), xDrive60 (upgraded mid-tier), and M70 xDrive (replacing M60, with 650 hp). All trims gain larger batteries, higher power, longer range, and faster DC charging vs MY2025. Competes with Mercedes EQE SUV, Audi Q8 e-tron, and Tesla Model X.\n\nSources:\n- https://www.bmwusa.com/vehicles/bmw-i-series/ix/bmw-ix.html\n- https://www.edmunds.com/bmw/ix/\n- https://www.kbb.com/bmw/ix/",
  powertrainOptions: ["BEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- BMW USA — https://www.bmwusa.com/vehicles/bmw-i-series/ix/bmw-ix.html\n- Edmunds 2026 iX — https://www.edmunds.com/bmw/ix/\n- KBB 2026 iX — https://www.kbb.com/bmw/ix/\n- JD Power 2026 iX review — https://www.jdpower.com/cars/expert-reviews/2026-bmw-ix-review-update",
  exclusionReason: "All years excluded",
  carMakeSlug: "bmw",
} as const satisfies CarModel
