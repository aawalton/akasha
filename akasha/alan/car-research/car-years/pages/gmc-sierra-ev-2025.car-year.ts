import type { CarYear } from "../car-year.page-type.ts"

export const gmcSierraEv2025 = {
  id: "019e4adf-d39c-7cf6-b342-4ac2d5f94a17",
  pageTypeSlug: "car-year",
  slug: "gmc-sierra-ev-2025",
  title: "2025",
  modelYear: 2025,
  refreshNotes:
    "2025 Sierra EV launches in Denali trim only (no Edition 1 designation; renamed to Extended Range and Max Range variants). Pricing dropped vs the 2024 Edition 1: Extended Range $91,995 MSRP, Max Range $100,495 (incl. $2,095 destination). Max Range adds ~70 mi of GM-estimated range vs Edition 1 (now up to 460 mi). 760 hp / 785 lb-ft in Max Power mode; 10,500 lb towing. CCS1 port; Supercharger access via NACS adapter. Sources: https://news.gmc.com/newsroom.detail.html/Pages/news/us/en/2024/oct/1014-sierraev.html ; https://www.cars.com/articles/2025-gmc-sierra-ev-denali-no-longer-edition-1-still-fully-loaded-490712/ ; https://www.edmunds.com/gmc/sierra-ev/2025/",
  shortList: false,
  sources:
    "- https://news.gmc.com/newsroom.detail.html/Pages/news/us/en/2024/oct/1014-sierraev.html\n- https://www.cars.com/articles/2025-gmc-sierra-ev-denali-no-longer-edition-1-still-fully-loaded-490712/\n- https://www.edmunds.com/gmc/sierra-ev/2025/\n- https://www.greencars.com/expert-insights/2025-gmc-sierra-ev-denali-does-all-electric-pickup-stuff-in-a-big-way",
  exclusionReason: "All trims excluded",
  carModelSlug: "gmc-sierra-ev",
} as const satisfies CarYear
