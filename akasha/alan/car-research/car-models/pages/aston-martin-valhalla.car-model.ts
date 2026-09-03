import type { CarModel } from "../car-model.page-type.ts"

export const astonMartinValhalla = {
  id: "019e4ad5-57ec-77c6-ac3c-2c5a6631c010",
  pageTypeSlug: "car-model",
  slug: "aston-martin-valhalla",
  title: "Valhalla",
  bodyStyle: "coupe",
  generation: "1st gen (Project 003 / AM-RB 003)",
  modelYearsAvailable: "2026",
  overview:
    "The Valhalla is Aston Martin's first mid-engine, plug-in hybrid hypercar — a road-going descendant of the AM-RB 003 concept that began life as a joint project with Red Bull Advanced Technologies. It pairs a flat-plane-crank 4.0L twin-turbo V8 (Mercedes-AMG-derived, the most powerful V8 ever fitted to an Aston Martin) with three e-motors (two driving the front axle for AWD, one integrated into the 8-speed DCT) for a combined 1,064 hp / 811 lb-ft. Production is limited to 999 units globally with US deliveries beginning Q2-Q4 2026. It is positioned against the Ferrari SF90, McLaren Artura, and Lamborghini Revuelto. Aimed at collectors and Aston Martin VIP clients — a halo PHEV that previews the brand's electrified powertrain direction. Sources: https://www.astonmartin.com/en-us/models/valhalla ; https://en.wikipedia.org/wiki/Aston_Martin_Valhalla",
  powertrainOptions: ["PHEV"],
  segment: "exotic",
  shortList: false,
  sources:
    "- Aston Martin USA: https://www.astonmartin.com/en-us/models/valhalla\n- Wikipedia: https://en.wikipedia.org/wiki/Aston_Martin_Valhalla\n- Motor1 first drive: https://www.motor1.com/reviews/791442/aston-martin-valhalla-first-drive-review/\n- WardsAuto technical data: https://www.wardsauto.com/news/aston-martin-releases-tech-data-on-1-000-hp-valhalla-hypercar/778308/",
  exclusionReason: "All years excluded",
  carMakeSlug: "aston-martin",
} as const satisfies CarModel
