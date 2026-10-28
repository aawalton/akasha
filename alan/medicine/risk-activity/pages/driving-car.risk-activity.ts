import type { RiskActivity } from "akasha/alan/medicine/risk-activity/risk-activity.page-type.types.ts"

export const drivingCar = {
  id: "01a183eb-0862-77d6-b987-a17d5ffe85e0",
  type: "page-type/risk-activity",
  slug: "driving-car",
  exposureUnit: "per 100 person-miles (occupant of passenger car/light truck)",
  micromortsPerUnitLow: 0.48,
  micromortsPerUnitCentral: 0.59,
  micromortsPerUnitHigh: 0.84,
  exposureAssumption:
    "Every injury rate is unverified, mostly borrowed injury-type shares applied to a total. Every disability duration is an assumption. These borrow the nearest GBD weight: Fractures (all sites; face and upper limb most common in occupants).",
  injuryDisability: [
    {
      injury: "Neck/back sprain or strain (whiplash)",
      injuriesPerMillionUnits: 10.4,
      disabilityWeight: 0.008,
      disabilityYears: 0.25,
    },
    {
      injury: "Contusion",
      injuriesPerMillionUnits: 6.73,
      disabilityWeight: 0.008,
      disabilityYears: 0.04,
    },
    {
      injury: "Other sprains/strains (limbs)",
      injuriesPerMillionUnits: 2.88,
      disabilityWeight: 0.008,
      disabilityYears: 0.1,
    },
    {
      injury: "Fractures (all sites; face and upper limb most common in occupants)",
      injuriesPerMillionUnits: 2.7,
      disabilityWeight: 0.05,
      disabilityYears: 0.3,
    },
    {
      injury: "Concussion / minor TBI",
      injuriesPerMillionUnits: 1.86,
      disabilityWeight: 0.11,
      disabilityYears: 0.1,
    },
  ],
  sources: [
    {
      citation:
        "NHTSA, Overview of Motor Vehicle Traffic Crashes in 2022 (Traffic Safety Facts Research Note, DOT HS 813 560, April 2024), Table 4 (NSC-hosted copy)",
      url: "https://www.nsc.org/getmedia/5efb579f-6c0b-47e3-ab87-951e7c0d1dbc/adid-nhtsa-overview-of-mv-crashes-2022.pdf",
    },
    {
      citation:
        "NHTSA, Traffic Safety Facts 2022 Data: Motorcycles (DOT HS 813 589, July 2024), Tables 1 and 2",
      url: "https://crashstats.nhtsa.dot.gov/Api/Public/Publication/813589",
    },
    {
      citation: "IIHS-HLDI, Fatality Facts 2024: Yearly snapshot (FARS-based, posted 2026)",
      url: "https://www.iihs.org/research-areas/fatality-statistics/detail/yearly-snapshot",
    },
    {
      citation: "FHWA, Summary of Travel Trends: 2022 National Household Travel Survey, Table 5-2",
      url: "https://nhts.ornl.gov/assets/2022/pub/2022_NHTS_Summary_Travel_Trends.pdf",
    },
    {
      citation:
        "NCHS Data Brief No. 185, Emergency Department Visits for Motor Vehicle Traffic Injuries: United States, 2010-2011",
      url: "https://www.cdc.gov/nchs/products/databriefs/db185.htm",
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
