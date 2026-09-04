import type { CarModel } from "../car-model.page-type.ts"

export const acuraRsx = {
  id: "019e4ad7-959c-7437-8d43-662acfd2ac1b",
  pageTypeSlug: "car-model",
  slug: "acura-rsx",
  title: "RSX",
  bodyStyle: "crossover",
  generation: "1st gen (Honda 0 Series / Honda global EV platform)",
  modelYearsAvailable: "2026",
  overview:
    "The Acura RSX is the brand's first in-house developed EV, built on Honda's new global EV platform (Honda 0 Series). Production begins late 2025 at Honda's new EV Hub in Ohio, with US launch in the second half of 2026 as a MY2026 vehicle. Note: the RSX name was previously used for an Acura sport coupe (2002-2006); this RSX is unrelated, a compact luxury electric SUV. The RSX is significant as Acura's first vehicle on Honda's own EV architecture (vs the GM-derived ZDX) and the first Acura with the new ASIMO Operating System. Standard dual-motor AWD. Expected to feature 600 hp range (top trim), bidirectional charging, and an Acura-first native NACS port. Sources: https://www.motor1.com/features/749095/acura-rsx-electric-crossover-horsepower-price-details/ , https://recharged.com/articles/2026-acura-rsx-electric",
  powertrainOptions: ["BEV"],
  segment: "luxury-compact",
  shortList: false,
  sources:
    "1. https://www.kbb.com/acura/rsx/\n2. https://www.edmunds.com/acura/rsx/\n3. https://www.motor1.com/features/749095/acura-rsx-electric-crossover-horsepower-price-details/\n4. https://recharged.com/articles/2026-acura-rsx-electric",
  exclusionReason: "All years excluded",
  carMakeSlug: "acura",
} as const satisfies CarModel
