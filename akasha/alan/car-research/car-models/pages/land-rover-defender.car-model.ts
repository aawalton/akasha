import type { CarModel } from "../car-model.page-type.ts"

export const landRoverDefender = {
  id: "019e4ae7-6ae0-754e-a455-df52d806fcba",
  pageTypeSlug: "car-model",
  slug: "land-rover-defender",
  title: "Defender",
  bodyStyle: "suv",
  generation: "2nd gen (L663, D7x platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The 2020-launched Defender (L663) is the modern reinterpretation of the iconic Land Rover Defender, sold in the US in three wheelbases: 90 (2-door), 110 (4-door, 5-7 seat), and 130 (long-wheelbase 8-seat). The US-market electrified powertrain is the P400 — a 3.0L turbocharged inline-6 Ingenium gas engine paired with a 48V mild-hybrid (MHEV) integrated belt-driven starter-generator that supports low-speed torque assist and brake regen, rated at 395 hp / 406 lb-ft, 0–60 in ~5.8 s. Non-electrified options include the P300 2.0L turbo-4 ICE (base, where offered) and the P525/P535 5.0L supercharged V8 (Octa) — these are excluded from this research as ICE-only. A plug-in hybrid P400e variant exists in UK/EU/Australia markets but is NOT sold in the US. Target buyer cross-shops Mercedes-Benz G-Class, Jeep Wrangler Rubicon, and (loosely) Toyota Land Cruiser — emphasizing genuine off-road capability with modern luxury appointments. Sources: https://www.landroverusa.com/defender/defender/index.html , https://en.wikipedia.org/wiki/Land_Rover_Defender_(L663)",
  powertrainOptions: ["MHEV", "ICE"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- https://www.landroverusa.com/defender/defender/models-and-specifications.html\n- https://www.edmunds.com/land-rover/defender/\n- https://en.wikipedia.org/wiki/Land_Rover_Defender_(L663)\n- https://www.landroverwesthouston.com/research/2025-defender-110-trim-levels.htm\n- https://www.landroverbethesda.com/research/2025-defender-90-trim-levels.htm",
  exclusionReason: "All years excluded",
  carMakeSlug: "land-rover",
} as const satisfies CarModel
