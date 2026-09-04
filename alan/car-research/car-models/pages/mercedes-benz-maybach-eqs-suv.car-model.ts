import type { CarModel } from "../car-model.page-type.ts"

export const mercedesBenzMaybachEqsSuv = {
  id: "019e4af0-52ac-7407-879e-b1f2463b78ed",
  pageTypeSlug: "car-model",
  slug: "mercedes-benz-maybach-eqs-suv",
  title: "Maybach EQS SUV",
  bodyStyle: "suv",
  generation: "1st gen (X296, EVA platform, Maybach sub-brand)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Mercedes-Maybach EQS SUV (EQS 680 4MATIC) is the ultra-luxury Maybach sub-brand variant of the EQS SUV, sharing the EVA platform and 108 kWh usable battery pack. 649 hp / 700 lb-ft from dual motors, 0-60 in 4.1 sec, 5-passenger seating only (4-passenger with the no-cost Executive Rear Seat Package Plus that swaps middle seat for console + airplane tray tables). 300 mi EPA range. Single trim only with limited options including a fridge and silver-plated Champagne flutes. MSRP $181,250 for 2026. Sources: https://www.mbusa.com/en/vehicles/class/maybach-eqs/suv ; https://www.edmunds.com/mercedes-benz/maybach-eqs-suv/",
  powertrainOptions: ["BEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- https://www.mbusa.com/en/vehicles/class/maybach-eqs/suv\n- https://www.edmunds.com/mercedes-benz/maybach-eqs-suv/\n- https://www.kbb.com/mercedes-benz/mercedes-maybach-eqs-suv/2026/eqs-680-4matic/",
  exclusionReason: "All years excluded",
  carMakeSlug: "mercedes-benz",
} as const satisfies CarModel
