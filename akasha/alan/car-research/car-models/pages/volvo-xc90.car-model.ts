import type { CarModel } from "../car-model.page-type.ts"

export const volvoXc90 = {
  id: "019e4afd-3332-7f39-988f-05d5bd94035c",
  pageTypeSlug: "car-model",
  slug: "volvo-xc90",
  title: "XC90",
  bodyStyle: "suv",
  generation: "2nd gen (SPA platform, 2016–present; major refresh for MY2025)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The XC90 is Volvo's full-size 3-row luxury SUV — the ICE/PHEV counterpart to the EX90 BEV. Built at Volvo's Torslanda, Sweden plant. The 2nd-gen (XC90 II) launched in 2016 and was refreshed for MY2025 with new front-end, new interior, and Volvo Car UX with Google Built-in. Available as B5 (247 hp 48V mild-hybrid AWD), B6 (295 hp 48V mild-hybrid AWD), or T8 plug-in hybrid (455 hp combined, ~35 mi electric range, 66 MPGe). Standard 7-passenger seating with optional 6-passenger captain's chairs. MY2026 carries the refresh forward; the next-gen XC90 (rumored SPA1.5 / long-range PHEV) is expected later but not yet on sale. Sources: https://www.volvocars.com/us/cars/xc90/, https://www.volvocars.com/us/cars/xc90-hybrid/, https://www.edmunds.com/volvo/xc90/2026/",
  powertrainOptions: ["PHEV", "MHEV"],
  segment: "luxury-full-size",
  shortList: false,
  sources:
    "- https://www.volvocars.com/us/cars/xc90/\n- https://www.volvocars.com/us/cars/xc90-hybrid/\n- https://www.edmunds.com/volvo/xc90/2026/plug-in-hybrid/",
  exclusionReason: "All years excluded",
  carMakeSlug: "volvo",
} as const satisfies CarModel
