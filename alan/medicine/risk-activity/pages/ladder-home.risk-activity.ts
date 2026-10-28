import type { RiskActivity } from "akasha/alan/medicine/risk-activity/risk-activity.page-type.types.ts"

export const ladderHome = {
  id: "01a183ed-755a-7ed2-b4a8-7a9c27641365",
  type: "page-type/risk-activity",
  slug: "ladder-home",
  exposureUnit: "per event (one ladder-use episode)",
  micromortsPerUnitLow: 0.12,
  micromortsPerUnitCentral: 0.25,
  micromortsPerUnitHigh: 0.5,
  exposureAssumption:
    "The death rate assumes how often people use a ladder each year, taken from Australian studies. The death figure is not verified against a source read in full. Every injury rate is unverified, mostly borrowed injury-type shares applied to a total. Every disability duration is an assumption. These borrow the nearest GBD weight: Fracture (any site; most often leg/ankle/foot); Cervical spine fracture; Skull (cranial) fracture / significant head injury.",
  injuryDisability: [
    {
      injury: "Fracture (any site; most often leg/ankle/foot)",
      injuriesPerMillionUnits: 27,
      disabilityWeight: 0.05,
      disabilityYears: 0.25,
      injuriesPerMillionUnitsLow: 14,
      injuriesPerMillionUnitsHigh: 200,
      disabilityWeightLow: 0.032,
      disabilityWeightHigh: 0.075,
    },
    {
      injury: "Cervical spine fracture",
      injuriesPerMillionUnits: 0.37,
      disabilityWeight: 0.111,
      disabilityYears: 0.5,
      injuriesPerMillionUnitsLow: 0.19,
      injuriesPerMillionUnitsHigh: 0.74,
      disabilityWeightLow: 0.075,
      disabilityWeightHigh: 0.156,
    },
    {
      injury: "Skull (cranial) fracture / significant head injury",
      injuriesPerMillionUnits: 0.27,
      disabilityWeight: 0.214,
      disabilityYears: 1,
      injuriesPerMillionUnitsLow: 0.14,
      injuriesPerMillionUnitsHigh: 0.54,
      disabilityWeightLow: 0.141,
      disabilityWeightHigh: 0.297,
    },
    {
      injury: "Facial fracture",
      injuriesPerMillionUnits: 0.67,
      disabilityWeight: 0.067,
      disabilityYears: 0.1,
      injuriesPerMillionUnitsLow: 0.34,
      injuriesPerMillionUnitsHigh: 1.34,
      disabilityWeightLow: 0.044,
      disabilityWeightHigh: 0.097,
    },
    {
      injury: "Sprains, contusions, lacerations (non-fracture)",
      injuriesPerMillionUnits: 60,
      disabilityWeight: 0.008,
      disabilityYears: 0.05,
      injuriesPerMillionUnitsLow: 30,
      injuriesPerMillionUnitsHigh: 440,
      disabilityWeightLow: 0.003,
      disabilityWeightHigh: 0.015,
    },
  ],
  sources: [
    {
      citation:
        "CDC WONDER, Underlying Cause of Death 1999-2020, ICD-10 W11, US, 2015-2020 (queried via WONDER API, 2026-10-28)",
      url: "https://wonder.cdc.gov/ucd-icd10.html",
    },
    {
      citation:
        "D'Souza AL, Smith GA, Trifiletti LB. Ladder-related injuries treated in emergency departments in the United States, 1990-2005. Am J Prev Med 2007",
      url: "https://pubmed.ncbi.nlm.nih.gov/?term=Ladder-related+injuries+treated+in+emergency+departments+in+the+United+States%2C+1990-2005",
    },
    {
      citation:
        "Barbat A et al. Head, face, and neck fractures secondary to ladder-related injuries treated in US EDs 2009-2018. J Emerg Med 2020",
      url: "https://pubmed.ncbi.nlm.nih.gov/?term=Head%2C+Face%2C+and+Neck+Fractures+Secondary+to+Ladder-Related+Injuries",
    },
    {
      citation: "CDC MMWR. Occupational ladder fall injuries - United States, 2011",
      url: "https://www.cdc.gov/mmwr/preview/mmwrhtml/mm6316a2.htm",
    },
    {
      citation:
        "Hicks C et al. Ladder use in older people: type, frequency, tasks and predictors of risk behaviours. IJERPH 2021;18:9799",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8471785/",
    },
    {
      citation:
        "Pliner EM et al. Ladder use ability, behavior and exposure by age and gender. Geriatrics 2024",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11130934/",
    },
    {
      citation:
        "Timsina LR et al. Circumstances of fall-related injuries by age and gender among community-dwelling adults in the United States. PLoS One 2017",
      url: "https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0176561",
    },
  ],
  createdAt: "2026-10-28T19:12:19.801Z",
  updatedAt: "2026-10-28T19:22:46.075Z",
} as const satisfies RiskActivity
