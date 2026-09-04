import type { CarYear } from "../car-year.page-type.ts"

export const acuraRsx2026 = {
  id: "019e4ad7-b9a8-775a-a0aa-d81caf8e7444",
  pageTypeSlug: "car-year",
  slug: "acura-rsx-2026",
  title: "2026",
  modelYear: 2026,
  refreshNotes:
    "First model year of the all-new RSX EV. Acura's first in-house developed EV. Production begins late 2025; US dealer arrivals expected H2 2026. Acura's first model with a native NACS port (no adapter required for Tesla Superchargers) and first with the ASIMO Operating System (Honda-developed software stack with OTA updates). Trim lineup and final specs not fully published by Acura as of 2026-05-21; analyst expectations: base trim ~$50,000-$55,000, Type S trim ~$60,000-$65,000+. Sources: https://www.motor1.com/features/749095/acura-rsx-electric-crossover-horsepower-price-details/ , https://recharged.com/articles/2026-acura-rsx-electric",
  shortList: false,
  sources:
    "1. https://www.kbb.com/acura/rsx/\n2. https://www.edmunds.com/acura/rsx/\n3. https://www.motor1.com/features/749095/acura-rsx-electric-crossover-horsepower-price-details/",
  exclusionReason: "All trims excluded",
  carModelSlug: "acura-rsx",
} as const satisfies CarYear
