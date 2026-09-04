import type { CarModel } from "../car-model.page-type.ts"

export const bentleyContinentalGt = {
  id: "019e4ad6-c7af-7c25-9b6b-3752af27454e",
  pageTypeSlug: "car-model",
  slug: "bentley-continental-gt",
  title: "Continental GT",
  bodyStyle: "coupe",
  generation: "4th gen (Mk IV, 2024+ PHEV-only)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "Bentley's flagship 2-door grand-touring coupe, redesigned for the 2025 model year as a PHEV-only lineup (the V8-only GT was phased out late 2024). Pairs a twin-turbo 4.0L V8 with an electric motor and a 25.9 kWh battery, producing 671 hp (base/Azure/S trims) or 771 hp (Speed/Mulliner). EPA-rated ~39 mi EV range, ~52 MPGe combined, ~19 mpg combined on gasoline alone. 0-60 in 3.1 s and 208 mph top speed in Speed trim. 2026 lineup mirrors 2025 with five trims: base GT, Azure, S, Speed, Mulliner. Sources: https://www.bentleymotors.com/en/models/continental-gt.html ; https://www.bentleymotors.com/en/models/continental-gt/continental-gt-speed.html ; https://www.edmunds.com/car-news/2025-bentley-continental-gt-speed-first-drive-review.html",
  powertrainOptions: ["PHEV"],
  segment: "exotic",
  shortList: false,
  sources:
    "- https://www.bentleymotors.com/en/models/continental-gt.html\n- https://carbuzz.com/cars/bentley/continental-gt-speed/2025/\n- https://carbuzz.com/cars/bentley/continental-gt/2026/\n- https://www.edmunds.com/bentley/continental/2025/st-402064470/features-specs/",
  exclusionReason: "All years excluded",
  carMakeSlug: "bentley",
} as const satisfies CarModel
