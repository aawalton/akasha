import type { CarModel } from "../car-model.page-type.ts"

export const toyotaBz4x = {
  id: "019e4af8-4b39-7080-ad78-59d7ba37a30e",
  pageTypeSlug: "car-model",
  slug: "toyota-bz4x",
  title: "bZ4X",
  bodyStyle: "suv",
  generation: "1st gen (e-TNGA, co-developed with Subaru Solterra)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "Toyota's first dedicated battery-electric SUV, launched MY2023 in the US. Built on the e-TNGA platform jointly developed with Subaru (Solterra). Powered by 71.4 kWh gross / ~64 kWh usable LiPo battery. Available in FWD single-motor and AWD dual-motor configurations. EPA range up to 252 mi (FWD). The model received a wheel-detachment recall (NHTSA 22V-460) shortly after launch, leading to a temporary stop-sale. For MY2026 Toyota announced an updated bZ4X with revised name 'bZ', NACS port, and larger battery; expected late 2025/early 2026 US arrival. Source: https://www.toyota.com/bz4x/ ; https://www.caranddriver.com/toyota/bz4x ; https://insideevs.com/news/735069/toyota-bz4x-2026-refresh/",
  powertrainOptions: ["BEV"],
  segment: "compact",
  shortList: true,
  sources:
    "- https://www.toyota.com/bz4x/\n- https://www.fueleconomy.gov/feg/Find.do?action=sbs&id=46086 (2025 bZ4X)\n- https://pressroom.toyota.com/2025-toyota-bz4x-pricing/\n- https://insideevs.com/news/735069/toyota-bz4x-2026-refresh/",
  carMakeSlug: "toyota",
} as const satisfies CarModel
