import type { CarModel } from "../car-model.page-type.ts"

export const gmcSierraEv = {
  id: "019e4adf-4907-7d92-878e-de1cbdc2ac8c",
  pageTypeSlug: "car-model",
  slug: "gmc-sierra-ev",
  title: "Sierra EV",
  bodyStyle: "truck",
  generation: "1st gen (BT1 / Ultium platform)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The GMC Sierra EV is the all-electric variant of the Sierra 1500 nameplate, sharing the Ultium 800V platform with the Chevrolet Silverado EV and Hummer EV. Aimed at full-size pickup buyers wanting EV range (up to 460 mi Max Range Denali), GMC luxury (Super Cruise, MultiPro/MultiFlex midgate), and class-leading towing. Built at GM Factory Zero. 2025 launches with the Denali trim; 2026 adds Elevation and AT4 trims to broaden the lineup. Sources: https://www.gmc.com/electric/sierra-ev ; https://news.gm.com/home.detail.html/Pages/news/us/en/2025/mar/0327-2026-gmc-sierra-ev.html ; https://www.edmunds.com/gmc/sierra-ev/",
  powertrainOptions: ["BEV"],
  segment: "full-size",
  shortList: false,
  sources:
    "- https://www.gmc.com/electric/sierra-ev\n- https://news.gm.com/home.detail.html/Pages/news/us/en/2025/mar/0327-2026-gmc-sierra-ev.html\n- https://news.gmc.com/newsroom.detail.html/Pages/news/us/en/2024/oct/1014-sierraev.html\n- https://www.edmunds.com/gmc/sierra-ev/",
  exclusionReason: "All years excluded",
  carMakeSlug: "gmc",
} as const satisfies CarModel
