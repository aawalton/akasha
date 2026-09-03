import type { CarModel } from "../car-model.page-type.ts"

export const bmwX5 = {
  id: "019e4ad7-5b55-7d37-8b89-5581c4bb82e7",
  pageTypeSlug: "car-model",
  slug: "bmw-x5",
  title: "X5",
  bodyStyle: "suv",
  generation: "4th gen (G05, 2019-, LCI 2024)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The BMW X5 is BMW's mid-size luxury SUV, in its fourth generation (G05). For MY2024 BMW applied a Lifecycle Impulse (LCI) refresh and replaced the previous xDrive45e PHEV with the xDrive50e, which uses a larger 25.7 kWh usable / 29.5 kWh gross battery, a stronger e-motor, and a turbocharged inline-six gas engine producing combined 483 hp. The X5 xDrive50e is the only electrified X5 trim sold in the US for MY2025 / MY2026 — the gasoline xDrive40i and M60i exist as ICE/MHEV variants but the 50e is the only PHEV. Up to 38 miles EPA-rated electric range.\n\nSources:\n- https://www.bmwusa.com/vehicles/x-series/x5/bmw-x5.html\n- https://www.bmwblog.com/2025/12/07/bmw-x5-xdrive50e-review-range-charging-performance/",
  powertrainOptions: ["PHEV", "ICE", "MHEV"],
  segment: "luxury-midsize",
  shortList: false,
  sources:
    "- BMW USA — https://www.bmwusa.com/vehicles/x-series/x5/bmw-x5.html\n- BMW Blog X5 xDrive50e review — https://www.bmwblog.com/2025/12/07/bmw-x5-xdrive50e-review-range-charging-performance/\n- Edmunds 2026 X5 PHEV — https://www.edmunds.com/bmw/x5/2026/plug-in-hybrid/\n- KBB 2026 X5 xDrive50e — https://www.kbb.com/bmw/x5/2026/xdrive50e/",
  exclusionReason: "All years excluded",
  carMakeSlug: "bmw",
} as const satisfies CarModel
