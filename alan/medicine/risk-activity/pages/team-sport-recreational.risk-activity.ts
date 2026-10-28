import type { RiskActivity } from "akasha/alan/medicine/risk-activity/risk-activity.page-type.types.ts"

export const teamSportRecreational = {
  id: "01a183ed-755b-7030-8724-95f7c20b6be2",
  type: "page-type/risk-activity",
  slug: "team-sport-recreational",
  exposureUnit: "per hour",
  micromortsPerUnitLow: 0.03,
  micromortsPerUnitCentral: 0.4,
  micromortsPerUnitHigh: 1.5,
  exposureAssumption:
    "1 of 6 injury rates are unverified. Every disability duration is an assumption. These borrow the nearest GBD weight: Fracture (incl. stress fracture); Non-fatal sudden cardiac arrest (survived).",
  injuryDisability: [
    {
      injury: "Ankle sprain",
      injuriesPerMillionUnits: 2100,
      disabilityWeight: 0.008,
      disabilityYears: 0.08,
    },
    {
      injury: "Knee ligament injury (incl. ACL)",
      injuriesPerMillionUnits: 850,
      disabilityWeight: 0.113,
      disabilityYears: 0.75,
    },
    {
      injury: "Muscle/tendon strain (hamstring, groin)",
      injuriesPerMillionUnits: 1240,
      disabilityWeight: 0.008,
      disabilityYears: 0.06,
    },
    {
      injury: "Fracture (incl. stress fracture)",
      injuriesPerMillionUnits: 620,
      disabilityWeight: 0.05,
      disabilityYears: 0.2,
    },
    {
      injury: "Concussion",
      injuriesPerMillionUnits: 170,
      disabilityWeight: 0.11,
      disabilityYears: 0.05,
    },
    {
      injury: "Non-fatal sudden cardiac arrest (survived)",
      injuriesPerMillionUnits: 0.1,
      disabilityWeight: 0.074,
      disabilityYears: 1,
    },
  ],
  sources: [
    {
      citation:
        "Marijon E et al. Sports-related sudden death in the general population. Circulation 2011",
      url: "https://pubmed.ncbi.nlm.nih.gov/?term=Marijon+sports-related+sudden+death+in+the+general+population+Circulation+2011",
    },
    {
      citation:
        "Marijon E et al. Sudden cardiac arrest during sports activity in middle age. Circulation 2015",
      url: "https://pubmed.ncbi.nlm.nih.gov/25847988/",
    },
    {
      citation:
        "Albert CM et al. Triggering of sudden death from cardiac causes by vigorous exertion. NEJM 2000 (via secondary page)",
      url: "https://www.myheart.org.sg/heart-news/sudden-death-during-exercise/",
    },
    {
      citation:
        "Gurau TV et al. Epidemiology of injuries in men's professional and amateur football (Part I). J Clin Med 2023;12:5569",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10488230/",
    },
    {
      citation:
        "Kataria et al. Epidemiology of injuries in British basketball: retrospective cross-sectional study. BMJ Open SEM 2025",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12530424/",
    },
    {
      citation:
        "Donmez G et al. Injuries among recreational football players: prospective cohort. Clin J Sport Med 2018",
      url: "https://pubmed.ncbi.nlm.nih.gov/28727642/",
    },
    {
      citation:
        "Kilic O et al. Sequence of prevention for musculoskeletal injuries among recreational basketballers. Phys Sportsmed 2018",
      url: "https://pubmed.ncbi.nlm.nih.gov/?term=Sequence+of+Prevention+musculoskeletal+injuries+recreational+basketballers+systematic+review",
    },
  ],
  createdAt: "2026-10-28T19:12:19.801Z",
  updatedAt: "2026-10-28T19:12:19.801Z",
} as const satisfies RiskActivity
