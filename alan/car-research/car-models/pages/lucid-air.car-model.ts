import type { CarModel } from "../car-model.page-type.ts"

export const lucidAir = {
  id: "019e4aea-664e-71a7-aca9-ebe03ab1a1df",
  pageTypeSlug: "car-model",
  slug: "lucid-air",
  title: "Air",
  bodyStyle: "sedan",
  generation: "1st gen (LEAP platform, 900V architecture)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Lucid Air is Lucid Motors' flagship full-size luxury electric sedan and the company's first production vehicle, debuting in late 2021. Built on Lucid's in-house LEAP platform with a 900V high-voltage architecture, the Air offers class-leading efficiency (~5 mi/kWh on the rear-drive Pure) and the highest EPA range of any production EV (Grand Touring rated 512 miles). The lineup spans rear-drive Pure single-motor, AWD Touring dual-motor, the long-range Grand Touring, and the tri-motor 1,234 hp Sapphire performance flagship. It competes with the Mercedes-Benz EQS, Porsche Taycan, BMW i7, and Tesla Model S. The 2026 model year brought access to Tesla's Supercharger network (via adapter), a major DreamDrive ADAS update, and minor range improvements on Touring.\n\nSources:\n- https://lucidmotors.com/air\n- https://cars.usnews.com/cars-trucks/lucid/air\n- https://www.caranddriver.com/lucid/air",
  powertrainOptions: ["BEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- https://lucidmotors.com/air\n- https://www.cars.com/research/lucid-air-2025/\n- https://cars.usnews.com/cars-trucks/lucid/air\n- https://www.kbb.com/lucid/air/2025/specs/\n- https://insideevs.com/news/708712/lucid-air-pure-price-cut/",
  exclusionReason: "All years excluded",
  carMakeSlug: "lucid",
} as const satisfies CarModel
