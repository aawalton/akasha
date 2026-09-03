import type { CarModel } from "../car-model.page-type.ts"

export const bugattiTourbillon = {
  id: "019e4ad5-a5fb-7df7-9d9b-0a8f4efa663b",
  pageTypeSlug: "car-model",
  slug: "bugatti-tourbillon",
  title: "Tourbillon",
  bodyStyle: "coupe",
  generation: "1st gen (2026-)",
  modelYearsAvailable: "2026",
  overview:
    "The Bugatti Tourbillon is the successor to the Chiron and the first production Bugatti with an electrified powertrain. Revealed June 2024, it pairs a naturally aspirated 8.3L Cosworth-built V16 (1,000 hp, redline 9,000 rpm) with three Rimac-built electric motors (two front e-axle, one rear) for a combined 1,800 hp / 1,324 kW. A 25 kWh, 800V oil-cooled battery sits in the central tunnel and rear bulkhead and provides approximately 37 mi (60 km) of EV-only range plus front-axle torque vectoring. Top speed 276 mph (445 km/h), 0-62 mph in 2.0 seconds. Production is capped at 250 units globally with deliveries beginning 2026; North America has historically taken ~40-50% of Bugatti hypercar allocations. Starting price is approximately 3.8M EUR net (~$4.1-4.6M USD before customization). Sources: https://en.wikipedia.org/wiki/Bugatti_Tourbillon ; https://www.bugatti.com/en/models/tourbillon ; https://newsroom.bugatti.com/en/press-releases/the-bugatti-tourbillon-an-automotive-icon-pour-leternite",
  powertrainOptions: ["PHEV"],
  segment: "exotic",
  shortList: false,
  sources:
    "- Bugatti official Tourbillon page: https://www.bugatti.com/en/models/tourbillon\n- Wikipedia Bugatti Tourbillon: https://en.wikipedia.org/wiki/Bugatti_Tourbillon\n- Motor Authority Tourbillon reveal: https://www.motorauthority.com/news/1143588_bugatti-tourbillon-price-hp-photos-specs\n- Rimac Technology powertrain release: https://www.rimac-newsroom.com/press-releases/rimac-technology/rimac-technology-powers-the-bugatti-tourbillon-with-cutting-edge-battery-and-powe\n- duPont Registry pricing/specs: https://news.dupontregistry.com/blogs/bugatti-news/bugatti-tourbillon-price-specs-photos",
  exclusionReason: "All years excluded",
  carMakeSlug: "bugatti",
} as const satisfies CarModel
