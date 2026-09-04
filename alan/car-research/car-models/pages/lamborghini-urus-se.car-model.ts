import type { CarModel } from "../car-model.page-type.ts"

export const lamborghiniUrusSe = {
  id: "019e4ae5-318a-739a-819b-d1bf3e0ff768",
  pageTypeSlug: "car-model",
  slug: "lamborghini-urus-se",
  title: "Urus SE",
  bodyStyle: "suv",
  generation: "1st gen Urus (MLB Evo / PL73 platform) — SE PHEV variant",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The **Urus SE** is the PHEV variant of Lamborghini's super-SUV, introduced for MY2025 as the electrified replacement for the prior Urus S / Performante in the global lineup (the non-hybrid Urus S and Performante continue to be sold alongside it in some markets). The powertrain pairs the familiar 4.0L twin-turbo V8 (611 hp standalone) with a 25.9 kWh high-voltage battery and an electric motor (~178 hp integrated with the 8-speed automatic), for combined output of 789 hp / 701 lb-ft and a claimed 80% emissions reduction. Unlike the Revuelto and Temerario supercars, the Urus SE has **meaningful EV range** — EPA estimates 35 miles all-electric — making it the only Lamborghini that actually functions as a usable plug-in commuter. Air suspension, 48V active anti-roll, torque-vectoring rear differential, and rear-wheel steering carry over from prior Urus variants. Shares its underpinnings with the Audi Q8, Porsche Cayenne, Bentley Bentayga, and VW Touareg. Sources: https://www.lamborghini.com/en-en/models/urus/urus-se , https://en.wikipedia.org/wiki/Lamborghini_Urus , https://www.thedrive.com/car-reviews/2025-lamborghini-urus-se-review",
  powertrainOptions: ["PHEV"],
  segment: "exotic",
  shortList: false,
  sources:
    "1. https://www.lamborghini.com/en-en/models/urus/urus-se — official\n2. https://en.wikipedia.org/wiki/Lamborghini_Urus\n3. https://www.thedrive.com/car-reviews/2025-lamborghini-urus-se-review\n4. https://carbuzz.com/cars/lamborghini/urus-se/\n5. https://www.kbb.com/lamborghini/urus/\n6. https://www.edmunds.com/lamborghini/urus/",
  exclusionReason: "All years excluded",
  carMakeSlug: "lamborghini",
} as const satisfies CarModel
