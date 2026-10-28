import type { RiskActivity } from "akasha/alan/medicine/risk-activity/risk-activity.page-type.types.ts"

export const running = {
  id: "01a183eb-b133-7cdb-b1f1-c1b0136c4d51",
  type: "page-type/risk-activity",
  slug: "running",
  exposureUnit: "per hour",
  micromortsPerUnitLow: 0.03,
  micromortsPerUnitCentral: 0.7,
  micromortsPerUnitHigh: 1.6,
  exposureAssumption:
    "Every disability duration is an assumption. These borrow the nearest GBD weight: Achilles tendinopathy; Medial tibial stress syndrome (shin splints); Patellofemoral pain syndrome; Plantar fasciitis; Stress fracture / fracture (mostly tibia, metatarsal); Non-fatal cardiac arrest during races (survived).",
  injuryDisability: [
    {
      injury: "Achilles tendinopathy",
      injuriesPerMillionUnits: 793,
      disabilityWeight: 0.008,
      disabilityYears: 0.25,
    },
    {
      injury: "Medial tibial stress syndrome (shin splints)",
      injuriesPerMillionUnits: 724,
      disabilityWeight: 0.008,
      disabilityYears: 0.15,
    },
    {
      injury: "Patellofemoral pain syndrome",
      injuriesPerMillionUnits: 485,
      disabilityWeight: 0.008,
      disabilityYears: 0.3,
    },
    {
      injury: "Plantar fasciitis",
      injuriesPerMillionUnits: 470,
      disabilityWeight: 0.008,
      disabilityYears: 0.5,
    },
    {
      injury: "Ankle sprain",
      injuriesPerMillionUnits: 447,
      disabilityWeight: 0.008,
      disabilityYears: 0.1,
    },
    {
      injury: "Stress fracture / fracture (mostly tibia, metatarsal)",
      injuriesPerMillionUnits: 308,
      disabilityWeight: 0.05,
      disabilityYears: 0.2,
    },
    {
      injury: "Non-fatal cardiac arrest during races (survived)",
      injuriesPerMillionUnits: 1.5,
      disabilityWeight: 0.074,
      disabilityYears: 1,
    },
  ],
  sources: [
    {
      citation:
        "Kim JH et al. Cardiac arrest during long-distance running races. N Engl J Med 2012;366:130-40 (RACER 2000-2010)",
      url: "https://pubmed.ncbi.nlm.nih.gov/22236223/",
    },
    {
      citation:
        "Kim JH et al. Cardiac Arrest During Long-Distance Running Races. JAMA 2025 (RACER 2010-2023), via TCTMD report",
      url: "https://www.tctmd.com/news/racer-no-change-cardiac-arrests-during-marathons-survival",
    },
    {
      citation:
        "Albert CM et al. Triggering of sudden death from cardiac causes by vigorous exertion. N Engl J Med 2000;343:1355-61",
      url: "https://www.myheart.org.sg/heart-news/sudden-death-during-exercise/",
    },
    {
      citation:
        "Videbaek S et al. Incidence of running-related injuries per 1000 h of running in different types of runners: systematic review and meta-analysis. Sports Med 2015;45:1017-26",
      url: "https://pubmed.ncbi.nlm.nih.gov/25951917/",
    },
    {
      citation:
        "Kakouris N, Yener N, Fong DTP. A systematic review of running-related musculoskeletal injuries in runners. J Sport Health Sci 2021;10:513-22",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8500811/",
    },
  ],
  createdAt: "2026-10-28T19:10:24.049Z",
  updatedAt: "2026-10-28T19:10:24.049Z",
} as const satisfies RiskActivity
