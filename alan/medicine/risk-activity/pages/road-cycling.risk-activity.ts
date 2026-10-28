import type { RiskActivity } from "akasha/alan/medicine/risk-activity/risk-activity.page-type.types.ts"

export const roadCycling = {
  id: "01a183eb-0863-72d1-b7bd-795cba0fb708",
  type: "page-type/risk-activity",
  slug: "road-cycling",
  exposureUnit: "per 100 miles cycled",
  micromortsPerUnitLow: 6.3,
  micromortsPerUnitCentral: 9.4,
  micromortsPerUnitHigh: 12.9,
  exposureAssumption:
    "Every injury rate is unverified, mostly borrowed injury-type shares applied to a total. Every disability duration is an assumption. These borrow the nearest GBD weight: Head injury / TBI (mostly concussion); Wrist / forearm (and other upper-limb) fracture.",
  injuryDisability: [
    {
      injury: "Head injury / TBI (mostly concussion)",
      injuriesPerMillionUnits: 359,
      disabilityWeight: 0.11,
      disabilityYears: 0.1,
    },
    {
      injury: "Wrist / forearm (and other upper-limb) fracture",
      injuriesPerMillionUnits: 450.4,
      disabilityWeight: 0.028,
      disabilityYears: 0.25,
    },
    {
      injury: "Lower-limb fracture",
      injuriesPerMillionUnits: 165.7,
      disabilityWeight: 0.05,
      disabilityYears: 0.4,
    },
    {
      injury: "Contusion / abrasion",
      injuriesPerMillionUnits: 1005.6,
      disabilityWeight: 0.008,
      disabilityYears: 0.04,
    },
  ],
  sources: [
    {
      citation: "IIHS-HLDI, Fatality Facts 2024: Bicyclists",
      url: "https://www.iihs.org/research-areas/fatality-statistics/detail/bicyclists",
    },
    {
      citation:
        "NHTSA, Overview of Motor Vehicle Traffic Crashes in 2022 (Traffic Safety Facts Research Note, DOT HS 813 560, April 2024), Table 4 (NSC-hosted copy)",
      url: "https://www.nsc.org/getmedia/5efb579f-6c0b-47e3-ab87-951e7c0d1dbc/adid-nhtsa-overview-of-mv-crashes-2022.pdf",
    },
    {
      citation:
        "NTSB, Bicyclist Safety on US Roadways: Crash Risks and Countermeasures (Safety Research Report NTSB/SS-19/01, 2019)",
      url: "https://www.ntsb.gov/safety/safety-studies/Documents/SS1901.pdf",
    },
    {
      citation: "FHWA NHTS Brief: Non-Motorized Travel (2017 NHTS), April 2020",
      url: "https://nhts.ornl.gov/assets/FHWA_NHTS_Brief_Bike%20Ped%20Travel_041520.pdf",
    },
    {
      citation:
        "Emergency Department Visits for Bicycle-Related Traumatic Brain Injuries Among Children and Adults - United States, 2009-2018 (MMWR 2021)",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8118151/",
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
