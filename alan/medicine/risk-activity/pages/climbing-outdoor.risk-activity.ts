import type { RiskActivity } from "akasha/alan/medicine/risk-activity/risk-activity.page-type.types.ts"

export const climbingOutdoor = {
  id: "01a183ec-9551-7743-ab0f-bf72065f80f3",
  type: "page-type/risk-activity",
  slug: "climbing-outdoor",
  exposureUnit: "per hour",
  micromortsPerUnitLow: 3,
  micromortsPerUnitCentral: 6,
  micromortsPerUnitHigh: 12.5,
  exposureAssumption:
    "Every disability duration is an assumption. These borrow the nearest GBD weight: Head injury / concussion; Multiple trauma (polytrauma).",
  injuryDisability: [
    {
      injury: "Ankle / lower-leg injury incl. fracture",
      injuriesPerMillionUnits: 23,
      disabilityWeight: 0.05,
      disabilityYears: 0.25,
    },
    {
      injury: "Head injury / concussion",
      injuriesPerMillionUnits: 3,
      disabilityWeight: 0.11,
      disabilityYears: 0.1,
    },
    {
      injury: "Dislocation (mostly shoulder)",
      injuriesPerMillionUnits: 6,
      disabilityWeight: 0.062,
      disabilityYears: 0.15,
    },
    {
      injury: "Contusions, strains, sprains",
      injuriesPerMillionUnits: 17,
      disabilityWeight: 0.008,
      disabilityYears: 0.05,
    },
    {
      injury: "Multiple trauma (polytrauma)",
      injuriesPerMillionUnits: 9.5,
      disabilityWeight: 0.258,
      disabilityYears: 1,
    },
    {
      injury: "Spine / back injury",
      injuriesPerMillionUnits: 1.1,
      disabilityWeight: 0.111,
      disabilityYears: 0.5,
    },
  ],
  sources: [
    {
      citation:
        "Rugg C et al. Rock climbing emergencies in the Austrian Alps: injury patterns, risk analysis and preventive measures. IJERPH 2020;17:7596",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7589766/",
    },
    {
      citation: "US National Park Service, Yosemite Climbing Safety",
      url: "https://www.nps.gov/yose/planyourvisit/climbing_safety.htm",
    },
  ],
  createdAt: "2026-10-28T19:11:22.447Z",
  updatedAt: "2026-10-28T19:11:22.447Z",
} as const satisfies RiskActivity
