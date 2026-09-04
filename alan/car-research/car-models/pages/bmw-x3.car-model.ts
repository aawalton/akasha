import type { CarModel } from "../car-model.page-type.ts"

export const bmwX3 = {
  id: "019e4ad8-4b96-7ce8-8144-0b1dbe1daf7c",
  pageTypeSlug: "car-model",
  slug: "bmw-x3",
  title: "X3",
  bodyStyle: "suv",
  generation: "4th gen (G45, 2025-)",
  modelYearsAvailable: "2026",
  overview:
    "The BMW X3 is BMW's compact luxury SUV, in its fourth generation (G45) launched for MY2025 in the US. The MY2025 X3 was initially available only as ICE/MHEV (X3 30 xDrive, X3 M50 xDrive). For MY2026 BMW announced the return of a US X3 PHEV — the xDrive30e — expected to reach US showrooms in Spring 2026. The 30e xDrive uses a 2.0L turbo four-cylinder paired with an electric motor for 295 hp combined, ~50-56 miles WLTP electric range. Competes with Mercedes GLC PHEV, Audi Q5 e and Volvo XC60 Recharge.\n\nSources:\n- https://www.bmwusa.com/vehicles/x-series/x3/bmw-x3.html\n- https://www.bmwblog.com/2026/03/17/2026-bmw-x3-xdrive30e-phev-review/\n- https://www.bmwblog.com/2025/06/14/bmw-x3-30e-plug-in-hybrid-america/",
  powertrainOptions: ["PHEV", "ICE", "MHEV"],
  segment: "luxury-compact",
  shortList: false,
  sources:
    "- BMW USA X3 — https://www.bmwusa.com/vehicles/x-series/x3/bmw-x3.html\n- BMW Blog 2026 X3 30e review — https://www.bmwblog.com/2026/03/17/2026-bmw-x3-xdrive30e-phev-review/\n- topelectricsuv 2025 X3 PHEV miss — https://topelectricsuv.com/news/bmw/2025-bmw-x3-hybrid-details/\n- BMW of Milwaukee FAQ — https://www.bmwofmilwaukeenorth.com/research-hub/2026-bmw-x3-faq/",
  exclusionReason: "All years excluded",
  carMakeSlug: "bmw",
} as const satisfies CarModel
