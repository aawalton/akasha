import type { CarModel } from "../car-model.page-type.ts"

export const ram1500Rev = {
  id: "019e4af6-741e-76d6-a6af-e00acbbd798d",
  pageTypeSlug: "car-model",
  slug: "ram-1500-rev",
  title: "1500 REV",
  bodyStyle: "truck",
  generation: "STLA Frame 1st gen (EREV variant of DT-based body)",
  modelYearsAvailable: "2026",
  overview:
    "The Ram 1500 REV (originally launched and marketed as the Ram 1500 Ramcharger; renamed Ram 1500 REV in late 2025 after the cancellation of the separate all-electric Ram 1500 REV BEV) is a range-extended electric (EREV) full-size pickup truck. It uses dual electric motors (front and rear) for propulsion with a 91.8 kWh gross / 69.7 kWh usable lithium-ion battery, supplemented by a 3.6L Pentastar V6 'range extender' coupled to a 130 kW generator that produces electricity to charge the battery and extend range. The V6 has no mechanical connection to the wheels. Total system output is 663 hp / 615 lb-ft, with a 4.4-second 0-60 mph, 14,000 lb towing rating, and 2,625 lb payload. All-electric range is 145 miles; total range on a full battery and full gas tank is 690 miles (gas-only operation ~20 MPG combined). Stellantis renamed it 'Ram 1500 REV' after canceling the all-electric Ram 1500 REV BEV in September 2025. The truck began arriving at select US dealers in Q1 2026 as a 2026 MY product after multiple delays from original 2024 target. It is built at Stellantis Sterling Heights Assembly Plant, Michigan. In this Pages schema it is classified as PHEV (closest mapping; technically an EREV / series-hybrid with plug-in charging). Sources: https://www.ramtrucks.com/electric/1500-rev.html , https://insideevs.com/news/751663/ramcharger-ev-and-ice-mpg/ , https://en.wikipedia.org/wiki/Ram_1500_REV , https://www.cars.com/articles/2026-ram-1500-ramcharger-will-have-145-miles-of-electric-range-690-miles-of-hybrid-range-and-get-20-mpg-505597/",
  powertrainOptions: ["PHEV"],
  segment: "full-size",
  shortList: false,
  sources:
    "- https://www.ramtrucks.com/electric/1500-rev.html\n- https://www.ramtrucks.com/electric/ram-1500-ramcharger.html\n- https://insideevs.com/news/751663/ramcharger-ev-and-ice-mpg/\n- https://en.wikipedia.org/wiki/Ram_1500_REV\n- https://www.cars.com/articles/2026-ram-1500-ramcharger-will-have-145-miles-of-electric-range-690-miles-of-hybrid-range-and-get-20-mpg-505597/\n- https://www.media.stellantis.com/em-en/ram/press/range-extended-ram-1500-ramcharger-to-lead-brand-s-electrification-push",
  exclusionReason: "All years excluded",
  carMakeSlug: "ram",
} as const satisfies CarModel
