import type { CarModel } from "../car-model.page-type.ts"

export const mclarenW1 = {
  id: "019e4aec-7447-7010-be31-b4fca68dc568",
  pageTypeSlug: "car-model",
  slug: "mclaren-w1",
  title: "W1",
  bodyStyle: "coupe",
  generation: "Aerocell carbon monocoque (Ultimate Series)",
  modelYearsAvailable: "2026",
  overview:
    "The McLaren W1 is McLaren's flagship Ultimate Series PHEV hypercar, revealed in 2024 as the successor to the McLaren P1 and F1 (the latter giving the W1 its 'world's best' lineage name). Production is strictly limited to 399 units worldwide priced from $2.1M, with deliveries beginning in 2026. The W1 pairs an all-new 4.0L flat-plane-crank twin-turbo V8 (MHP-8) with a radial-flux E-module driving through an 8-speed DCT, fed by a power-dense 1.384 kWh (4.98 MJ) battery optimized for short-burst race-style discharge rather than long EV range. Combined output is 1,275 PS (1,258 hp). The chassis uses a new Aerocell carbon monocoque with front-suspension active aero and front-pushrod active aero. McLaren describes it as 'the real supercar' and the most powerful production McLaren ever made. Allocation is invitation-only to McLaren collectors; US dealer orders are closed. Sources: https://cars.mclaren.com/us_en/W1 ; https://en.wikipedia.org/wiki/McLaren_W1",
  powertrainOptions: ["PHEV"],
  segment: "exotic",
  shortList: false,
  sources:
    "- https://cars.mclaren.com/us_en/W1\n- https://en.wikipedia.org/wiki/McLaren_W1\n- https://www.mclarenhouston.com/2026-mclaren-w1\n- https://hiconsumption.com/motors/2026-mclaren-w1-supercar/",
  exclusionReason: "All years excluded",
  carMakeSlug: "mclaren",
} as const satisfies CarModel
