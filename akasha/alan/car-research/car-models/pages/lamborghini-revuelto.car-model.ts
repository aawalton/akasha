import type { CarModel } from "../car-model.page-type.ts"

export const lamborghiniRevuelto = {
  id: "019e4ae4-d823-71dc-9035-eced09c2db47",
  pageTypeSlug: "car-model",
  slug: "lamborghini-revuelto",
  title: "Revuelto",
  bodyStyle: "coupe",
  generation: "1st gen (LB744, replaces Aventador)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The **Revuelto** is Lamborghini's V12 flagship and the company's first **HPEV** (High Performance Electrified Vehicle). It replaces the Aventador and is the first Lamborghini PHEV in series production. The powertrain pairs a new 6.5L naturally-aspirated V12 (mounted longitudinally over a new monocoque) with three electric motors (two on the front axle for torque-vectoring AWD, one integrated in the 8-speed dual-clutch e-gearbox) drawing on a 3.8 kWh lithium-ion battery in the central transmission tunnel. Combined output is 1,001 hp (1,015 CV) and 1,044 lb-ft. The Revuelto cannot meaningfully run on electric power — pure-EV range is only ~5-6 miles — and the hybrid system exists primarily for performance (instant torque fill, front-axle torque-vectoring) and emissions compliance rather than electrified utility. US deliveries began late 2023; the model is currently sold in MY2024, MY2025, and MY2026 forms with no major mechanical changes year-to-year. Sources: https://www.lamborghini.com/en-en/models/revuelto , https://en.wikipedia.org/wiki/Lamborghini_Revuelto",
  powertrainOptions: ["PHEV"],
  segment: "exotic",
  shortList: false,
  sources:
    "1. https://www.lamborghini.com/en-en/models/revuelto — official\n2. https://en.wikipedia.org/wiki/Lamborghini_Revuelto\n3. https://www.fueleconomy.gov/feg/Find.do?action=sbs&id=48581 — EPA MY25\n4. https://www.edmunds.com/lamborghini/revuelto/\n5. https://www.kbb.com/lamborghini/revuelto/2025/specs/",
  exclusionReason: "All years excluded",
  carMakeSlug: "lamborghini",
} as const satisfies CarModel
