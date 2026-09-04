import type { CarModel } from "../car-model.page-type.ts"

export const dodgeHornetRT = {
  id: "019e4ad9-6230-74f4-9fb9-7e0bd351ec95",
  pageTypeSlug: "car-model",
  slug: "dodge-hornet-r-t",
  title: "Hornet R/T",
  bodyStyle: "suv",
  generation: "1st gen (Tonale-based, type 363)",
  modelYearsAvailable: "2025",
  overview:
    "The Dodge Hornet R/T is the PHEV version of Dodge's first compact crossover (introduced MY2023), built in Italy on the Stellantis Alfa Romeo Tonale platform. The R/T pairs a 1.3L turbo I4 with a 90 kW rear electric motor and 15.5 kWh battery for 288 hp combined output (with PowerShot), 32-33 miles of electric range, eAWD via the rear motor, and a 5.6-second 0-60 mph time. Two trims for MY2025: R/T and R/T Plus. Discontinued after MY2025 in January 2026 due to slow sales (54% YoY decline, 82% Q4 2025 decline) and the impact of the Trump administration's 25% imported-vehicle tariff. No MY2026. Existing owners retain 3yr/36k bumper-to-bumper, 5yr/60k powertrain, 8yr/80k hybrid component, and 8yr/100k battery warranties; parts and service continue. Sources: https://www.dodge.com/hornet.html ; https://www.autoblog.com/news/dodge-officially-kills-hornet ; https://en.wikipedia.org/wiki/Dodge_Hornet",
  powertrainOptions: ["PHEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- https://www.dodge.com/2025/hornet/specs.rt.html\n- https://cars.usnews.com/cars-trucks/dodge/hornet-plug-in-hybrid\n- https://www.autoblog.com/news/dodge-officially-kills-hornet\n- https://www.edmunds.com/dodge/hornet/2025/plug-in-hybrid/\n- https://www.hornetowners.com/threads/dodge-hornet-and-all-other-stellantis-phev-models-officially-discontinued.1502/",
  exclusionReason: "All years excluded",
  carMakeSlug: "dodge",
} as const satisfies CarModel
