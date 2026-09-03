import type { CarModel } from "../car-model.page-type.ts"

export const cadillacLyriqV = {
  id: "019e4ad6-b6ec-77ff-850d-c0b214402bee",
  pageTypeSlug: "car-model",
  slug: "cadillac-lyriq-v",
  title: "Lyriq-V",
  bodyStyle: "suv",
  generation: "1st gen (BEV3 platform)",
  modelYearsAvailable: "2026",
  overview:
    "The Lyriq-V is the high-performance V-Series variant of the Lyriq, introduced as a 2026 model. It uses the same BEV3 platform and Ultium architecture but with retuned dual motors producing 615 horsepower and 0-60 in 3.3 seconds. Distinguished by V-Series styling cues, performance brakes, and aggressive aero. Sources: [Edmunds 2026 Lyriq-V](https://www.edmunds.com/cadillac/lyriq/2026/v/), [TrueCar Lyriq-V](https://www.truecar.com/overview/cadillac/lyriq-v/).",
  powertrainOptions: ["BEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- [Edmunds 2026 Lyriq-V](https://www.edmunds.com/cadillac/lyriq/2026/v/)\n- [KBB 2026 Lyriq-V specs](https://www.kbb.com/cadillac/lyriq-v/2026/specs/)\n- [TrueCar Lyriq-V](https://www.truecar.com/overview/cadillac/lyriq-v/)",
  exclusionReason: "All years excluded",
  carMakeSlug: "cadillac",
} as const satisfies CarModel
