import type { CarModel } from "../car-model.page-type.ts"

export const toyota4runnerHybrid = {
  id: "019e4b10-4720-77d8-8296-f40ebcc2d40d",
  pageTypeSlug: "car-model",
  slug: "toyota-4runner-hybrid",
  title: "4Runner Hybrid",
  bodyStyle: "suv",
  generation: "6th gen (N300), launched MY2025",
  modelYearsAvailable: "2025, 2026",
  overview:
    "6th-gen 4Runner launched for MY2025 with body-on-frame TNGA-F platform shared with Tacoma. i-FORCE MAX HEV powertrain (2.4L turbo + electric motor, 326 hp combined, 465 lb-ft) available on TRD Off-Road Premium, Limited, Platinum; standard on TRD Pro and Trailhunter. Non-hybrid 'i-FORCE' 2.4L turbo trims (SR5, TRD Sport) excluded from this scope. Source: https://www.toyota.com/4runner/ ; https://pressroom.toyota.com/2025-toyota-4runner/",
  powertrainOptions: ["HEV"],
  segment: "midsize",
  shortList: false,
  sources: "- https://www.toyota.com/4runner/\n- https://pressroom.toyota.com/2025-toyota-4runner/",
  exclusionReason: "All years excluded",
  carMakeSlug: "toyota",
} as const satisfies CarModel
