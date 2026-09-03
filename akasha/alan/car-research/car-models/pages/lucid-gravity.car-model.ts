import type { CarModel } from "../car-model.page-type.ts"

export const lucidGravity = {
  id: "019e4aea-8c67-75b4-93aa-5c9bfc3b0099",
  pageTypeSlug: "car-model",
  slug: "lucid-gravity",
  title: "Gravity",
  bodyStyle: "suv",
  generation: "1st gen (LEAP platform, 926V architecture)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Lucid Gravity is Lucid Motors' first SUV, a three-row full-size luxury electric SUV that began production in late 2024 with first customer deliveries in early 2025. It rides on an evolution of Lucid's LEAP platform (926V architecture, native NACS port), offers seating for five or seven, and shares the Air's emphasis on efficiency, packaging, and powertrain miniaturization. Both trims (Touring, Grand Touring) come standard with dual-motor all-wheel drive, with up to 450 miles of EPA range on Grand Touring. It competes with the Rivian R1S, Tesla Model X, BMW iX, Mercedes-Benz EQS SUV, and Cadillac Escalade IQ. Reservations opened 2023; the lower-priced Touring trim launched alongside Grand Touring for the 2026 model year.\n\nSources:\n- https://lucidmotors.com/gravity\n- https://cars.usnews.com/cars-trucks/lucid/gravity\n- https://theweeklydriver.com/2026/04/lucid-gravity-grand-touring-2026-buyer-guide/",
  powertrainOptions: ["BEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- https://lucidmotors.com/gravity\n- https://www.kbb.com/lucid/gravity/2026/specs/\n- https://cars.usnews.com/cars-trucks/lucid/gravity\n- https://www.truecar.com/overview/lucid/gravity/2026/\n- https://theweeklydriver.com/2026/04/lucid-gravity-touring-2026-preview/",
  exclusionReason: "All years excluded",
  carMakeSlug: "lucid",
} as const satisfies CarModel
