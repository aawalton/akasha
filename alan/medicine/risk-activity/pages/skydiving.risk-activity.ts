import type { RiskActivity } from "akasha/alan/medicine/risk-activity/risk-activity.page-type.types.ts"

export const skydiving = {
  id: "01a183ed-755b-7e20-a6fd-d342e40a0d13",
  type: "page-type/risk-activity",
  slug: "skydiving",
  exposureUnit: "per jump",
  micromortsPerUnitLow: 2.3,
  micromortsPerUnitCentral: 4.5,
  micromortsPerUnitHigh: 7.5,
  exposureAssumption:
    "Every injury rate is unverified, mostly borrowed injury-type shares applied to a total. Every disability duration is an assumption.",
  injuryDisability: [
    {
      injury: "Ankle / lower-leg fracture",
      injuriesPerMillionUnits: 150,
      disabilityWeight: 0.05,
      disabilityYears: 0.25,
    },
    {
      injury: "Ankle sprain / lower-limb soft tissue",
      injuriesPerMillionUnits: 125,
      disabilityWeight: 0.008,
      disabilityYears: 0.15,
    },
    {
      injury: "Spinal (vertebral) injury",
      injuriesPerMillionUnits: 62,
      disabilityWeight: 0.111,
      disabilityYears: 0.5,
    },
  ],
  sources: [
    {
      citation:
        "USPA, Skydiving Safety (fatality and jump statistics 2004-2025; 2025 member injury survey)",
      url: "https://www.uspa.org/discover/faqs/safety",
    },
    {
      citation:
        "Barthel C et al. Recreational Skydiving - Really That Dangerous? A Systematic Review. 2023 (PMC9859333)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9859333/",
    },
    {
      citation: "USPA Parachutist, ankle injuries in skydiving",
      url: "https://parachutist.com/Article/thats-how-we-roll-ankle-injuries-in-skydiving",
    },
  ],
  createdAt: "2026-10-28T19:12:19.801Z",
  updatedAt: "2026-10-28T19:12:19.801Z",
} as const satisfies RiskActivity
