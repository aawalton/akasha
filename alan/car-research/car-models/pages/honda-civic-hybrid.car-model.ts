import type { CarModel } from "../car-model.page-type.ts"

export const hondaCivicHybrid = {
  id: "019e4ae0-d255-76ae-bbe8-4b9f192d0897",
  pageTypeSlug: "car-model",
  slug: "honda-civic-hybrid",
  title: "Civic Hybrid",
  bodyStyle: "sedan",
  generation: "11th gen (FL/FE chassis, mid-cycle refresh MY2025)",
  modelYearsAvailable: "2025, 2026",
  overview:
    "The Civic Hybrid returned to the US market for MY2025 after a multi-year absence, debuted as part of the 11th-generation Civic mid-cycle refresh. It uses Honda's two-motor hybrid system (e:HEV) — a 2.0L Atkinson-cycle four paired with two electric motors producing a combined 200 hp and 232 lb-ft — borrowed from the Accord/CR-V and tuned for the Civic's lighter chassis. Offered in both sedan and hatchback body styles in Sport Hybrid and Sport Touring Hybrid trims, the Civic Hybrid won the 2026 Wards 10 Best Engines & Propulsion Systems award and Edmunds Top Rated 2026. It targets the Toyota Corolla Hybrid, Hyundai Elantra Hybrid, and Kia Niro Hybrid. Honda has signaled the Civic Hybrid will play a central role in its short-term hybrid-volume push while the 0 Series BEVs ramp up.\n\nSources:\n- https://hondanews.com/en-US/releases/release-f5104327140949bd8e4a5074de0248a5-2026-honda-civic-two-motor-hybrid-system-wins-prestigious-wards-10-best-engines-propulsion-systems-award\n- https://hondanews.com/en-US/honda-corporate/releases/release-0d0c9aa2f0868f6c47f73a03ac012abf-2026-honda-civic-hybrid-wins-edmunds-top-rated-2026-award\n- https://automobiles.honda.com/civic",
  powertrainOptions: ["HEV"],
  segment: "compact",
  shortList: false,
  sources:
    "- https://automobiles.honda.com/civic-sedan\n- https://automobiles.honda.com/civic-hatchback\n- https://www.edmunds.com/honda/civic/2025/hybrid/\n- https://www.edmunds.com/honda/civic/2026/hybrid/",
  exclusionReason: "All years excluded",
  carMakeSlug: "honda",
} as const satisfies CarModel
