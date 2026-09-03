import type { CarModel } from "../car-model.page-type.ts"

export const toyotaRav4Prime = {
  id: "019e4b01-98f8-7c4e-81c1-ba76b91a1c81",
  pageTypeSlug: "car-model",
  slug: "toyota-rav4-prime",
  title: "RAV4 Prime",
  bodyStyle: "suv",
  generation: "5th gen (XA50) PHEV variant",
  modelYearsAvailable: "2025, 2026",
  overview:
    "Plug-in hybrid version of the RAV4. Uses 2.5L 4-cyl + electric AWD system with larger battery (18.1 kWh) producing 302 hp combined. EPA all-electric range 42 mi, 94 MPGe combined, 38 mpg combined. Two trims: SE and XSE. 0-60 mph in 5.7 sec — fastest RAV4 ever. For MY2026 Toyota has announced the lineup transition to a redesigned RAV4 with HEV and PHEV powertrains; PHEV variant continues with expected naming change. Source: https://www.toyota.com/rav4prime/ ; https://www.fueleconomy.gov/feg/bymodel/2025_Toyota_RAV4_Prime.shtml",
  powertrainOptions: ["PHEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- https://www.toyota.com/rav4prime/\n- https://pressroom.toyota.com/2025-toyota-rav4-prime/\n- https://www.fueleconomy.gov/feg/bymodel/2025_Toyota_RAV4_Prime.shtml",
  exclusionReason: "All years excluded",
  carMakeSlug: "toyota",
} as const satisfies CarModel
