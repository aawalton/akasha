import type { RiskActivity } from "akasha/alan/medicine/risk-activity/risk-activity.page-type.types.ts"

export const walkingPedestrian = {
  id: "01a183eb-0863-75f0-a6c1-f9872dc5a791",
  type: "page-type/risk-activity",
  slug: "walking-pedestrian",
  exposureUnit: "per 100 miles walked",
  micromortsPerUnitLow: 15.6,
  micromortsPerUnitCentral: 17.9,
  micromortsPerUnitHigh: 22.3,
  exposureAssumption:
    "Every injury rate is unverified, mostly borrowed injury-type shares applied to a total. Every disability duration is an assumption. These borrow the nearest GBD weight: Other lower-limb fracture (femur, pelvis/hip, ankle, foot).",
  injuryDisability: [
    {
      injury: "Tibia/fibula fracture",
      injuriesPerMillionUnits: 9.31,
      disabilityWeight: 0.05,
      disabilityYears: 0.5,
    },
    {
      injury: "Other lower-limb fracture (femur, pelvis/hip, ankle, foot)",
      injuriesPerMillionUnits: 8.74,
      disabilityWeight: 0.111,
      disabilityYears: 0.5,
    },
    {
      injury: "Concussion / minor TBI",
      injuriesPerMillionUnits: 5.94,
      disabilityWeight: 0.11,
      disabilityYears: 0.1,
    },
    {
      injury: "Contusion",
      injuriesPerMillionUnits: 99.8,
      disabilityWeight: 0.008,
      disabilityYears: 0.04,
    },
    {
      injury: "Sprain/strain",
      injuriesPerMillionUnits: 17.2,
      disabilityWeight: 0.008,
      disabilityYears: 0.1,
    },
  ],
  sources: [
    {
      citation: "IIHS-HLDI, Fatality Facts 2024: Pedestrians",
      url: "https://www.iihs.org/research-areas/fatality-statistics/detail/pedestrians",
    },
    {
      citation:
        "NHTSA, Overview of Motor Vehicle Traffic Crashes in 2022 (Traffic Safety Facts Research Note, DOT HS 813 560, April 2024), Table 4 (NSC-hosted copy)",
      url: "https://www.nsc.org/getmedia/5efb579f-6c0b-47e3-ab87-951e7c0d1dbc/adid-nhtsa-overview-of-mv-crashes-2022.pdf",
    },
    {
      citation:
        "FHWA, Summary of Travel Trends: 2017 National Household Travel Survey, Table 9a (annual person trips by mode)",
      url: "https://nhts.ornl.gov/assets/2017_nhts_summary_travel_trends.pdf",
    },
    {
      citation: "FHWA NHTS Brief: Non-Motorized Travel (2017 NHTS), April 2020",
      url: "https://nhts.ornl.gov/assets/FHWA_NHTS_Brief_Bike%20Ped%20Travel_041520.pdf",
    },
    {
      citation:
        "NTSB, Bicyclist Safety on US Roadways: Crash Risks and Countermeasures (Safety Research Report NTSB/SS-19/01, 2019)",
      url: "https://www.ntsb.gov/safety/safety-studies/Documents/SS1901.pdf",
    },
    {
      citation:
        "Demographics, Injury Patterns, Injury Severity and Injury Predictors in Children with Non-Fatal Injuries Due to Road Traffic Injuries: An Analysis by Mode of Transportation. Children 2026;13(5):687 (NEISS-AIP 2005-2021, ages <19)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13204132/",
    },
  ],
  createdAt: "2026-10-28T19:09:40.833Z",
  updatedAt: "2026-10-28T19:09:40.833Z",
} as const satisfies RiskActivity
