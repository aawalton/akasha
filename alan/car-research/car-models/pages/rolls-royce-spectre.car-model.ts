import type { CarModel } from "../car-model.page-type.ts"

export const rollsRoyceSpectre = {
  id: "019e4af6-936e-7771-a0f7-83b9c12e1b5c",
  pageTypeSlug: "car-model",
  slug: "rolls-royce-spectre",
  title: "Spectre",
  bodyStyle: "coupe",
  generation: "1st gen (Architecture of Luxury / BMW Group spaceframe shared with 7 Series / iX)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Spectre is Rolls-Royce's first fully electric series-production model and the spiritual successor to the V12-powered Wraith and Phantom Coupe. Launched in late 2023 as a 2024 model and continuing essentially unchanged into MY2025/2026, it is a two-door, four-seat ultra-luxury electric grand tourer built on the BMW Group aluminum spaceframe shared with the Phantom VIII and the BMW iX. A dual-motor, 102 kWh NMC pack delivers up to ~291 EPA miles (22-inch wheels). The Black Badge variant, added for MY2025, becomes the most powerful Rolls-Royce ever produced (659 hp / 793 lb-ft). Together the Spectre and Black Badge Spectre represent Rolls-Royce's entire US-market electrified lineup through MY2026. Sources: https://www.rolls-roycemotorcars.com/en_US/showroom/spectre.html , https://www.edmunds.com/rolls-royce/spectre/2025/ , https://insideevs.com/news/751063/rolls-royce-spectre-black-badge/",
  powertrainOptions: ["BEV"],
  segment: "exotic",
  shortList: false,
  sources:
    "- https://www.rolls-roycemotorcars.com/en_US/showroom/spectre.html\n- https://www.kbb.com/rolls-royce/spectre/\n- https://www.edmunds.com/rolls-royce/spectre/2025/\n- https://www.cars.com/research/rolls_royce-spectre-2025/specs/\n- https://insideevs.com/news/701477/2024-rolls-royce-spectre-epa-range/\n- https://insideevs.com/news/751063/rolls-royce-spectre-black-badge/\n- https://ev-database.org/car/1765/Rolls-Royce-Spectre",
  exclusionReason: "All years excluded",
  carMakeSlug: "rolls-royce",
} as const satisfies CarModel
