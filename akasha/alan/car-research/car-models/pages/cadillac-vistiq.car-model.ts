import type { CarModel } from "../car-model.page-type.ts"

export const cadillacVistiq = {
  id: "019e4ad7-2391-7560-9959-364408156f0d",
  pageTypeSlug: "car-model",
  slug: "cadillac-vistiq",
  title: "Vistiq",
  bodyStyle: "suv",
  generation: "1st gen (BEV3 platform)",
  modelYearsAvailable: "2026",
  overview:
    "The Vistiq is Cadillac's all-new three-row electric SUV for 2026, slotting between the Lyriq and Escalade IQ. Built on the BEV3 platform with a 102-kWh Ultium battery and dual motors producing 615 horsepower. Seats six (captains chairs) or seven (bench), 305-mile range, 3.6 second 0-60, 5,000 lb tow capacity. Super Cruise standard. Replaces the discontinued XT6 in the lineup. Sources: [Edmunds 2026 Vistiq](https://www.edmunds.com/cadillac/vistiq/), [MotorWeek Vistiq Review](https://motorweek.org/road-tests/2026-cadillac-vistiq/).",
  powertrainOptions: ["BEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- [Edmunds 2026 Vistiq](https://www.edmunds.com/cadillac/vistiq/)\n- [MotorWeek Vistiq Road Test](https://motorweek.org/road-tests/2026-cadillac-vistiq/)\n- [Edmunds Vistiq Features Specs](https://www.edmunds.com/cadillac/vistiq/2026/features-specs/)",
  exclusionReason: "All years excluded",
  carMakeSlug: "cadillac",
} as const satisfies CarModel
