import type { CarModel } from "../car-model.page-type.ts"

export const toyotaTacomaHybrid = {
  id: "019e4b0f-1625-75d4-9735-a5a093843e26",
  pageTypeSlug: "car-model",
  slug: "toyota-tacoma-hybrid",
  title: "Tacoma Hybrid",
  bodyStyle: "truck",
  generation: "4th gen (N400), launched MY2024",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The 4th-gen Tacoma midsize pickup, launched for MY2024, introduced an i-FORCE MAX hybrid powertrain: 2.4L turbo 4-cyl + electric motor between engine and transmission, 326 hp combined, 465 lb-ft, paired to 8-speed automatic. Hybrid is available on TRD Sport, TRD Off-Road, Limited; standard on TRD Pro and Trailhunter. Non-hybrid 'i-FORCE' 2.4L turbo trims (SR, SR5) are excluded from this scope. Source: https://www.toyota.com/tacoma/ ; https://pressroom.toyota.com/2024-toyota-tacoma-iforce-max/",
  powertrainOptions: ["HEV"],
  segment: "midsize",
  shortList: false,
  sources:
    "- https://www.toyota.com/tacoma/\n- https://www.fueleconomy.gov/feg/bymodel/2025_Toyota_Tacoma_2WD.shtml",
  exclusionReason: "All years excluded",
  carMakeSlug: "toyota",
} as const satisfies CarModel
