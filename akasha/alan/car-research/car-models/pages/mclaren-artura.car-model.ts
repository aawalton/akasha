import type { CarModel } from "../car-model.page-type.ts"

export const mclarenArtura = {
  id: "019e4aec-49ae-7be8-a79e-5559e9fe25df",
  pageTypeSlug: "car-model",
  slug: "mclaren-artura",
  title: "Artura",
  bodyStyle: "coupe",
  generation: "1st gen (MCLA platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The McLaren Artura is McLaren's first series-production plug-in hybrid supercar, replacing the Sports Series 570S/600LT. Launched in 2022, it introduced the all-new McLaren Carbon Lightweight Architecture (MCLA) carbon-fibre tub designed from day one to package a hybrid powertrain. The Artura combines a new 3.0L 120-degree twin-turbocharged V6 (M630) with an axial-flux E-motor sandwiched between the engine and a new 8-speed dual-clutch transmission, drawing energy from a 7.4 kWh lithium-ion battery mounted low behind the cabin. A major 2025 model-year update raised combined output from 671 hp to 690 hp, sharpened transmission shift times, added the Artura Spider retractable-hardtop convertible, and updated the EPA electric-only range from ~11 mi to 21 mi. The coupe is McLaren's primary US volume model. Source: https://en.wikipedia.org/wiki/McLaren_Artura ; https://cars.mclaren.com/us_en/artura",
  powertrainOptions: ["PHEV"],
  segment: "exotic",
  shortList: false,
  sources:
    "- https://en.wikipedia.org/wiki/McLaren_Artura\n- https://cars.mclaren.com/us_en/artura\n- https://www.edmunds.com/mclaren/artura/2025/features-specs/\n- https://www.kbb.com/mclaren/artura/\n- https://www.cars.com/research/mclaren-artura-2025/",
  exclusionReason: "All years excluded",
  carMakeSlug: "mclaren",
} as const satisfies CarModel
