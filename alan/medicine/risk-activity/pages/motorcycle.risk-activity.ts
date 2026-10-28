import type { RiskActivity } from "akasha/alan/medicine/risk-activity/risk-activity.page-type.types.ts"

export const motorcycle = {
  id: "01a183eb-0863-7a2d-999f-b1c46a717a6f",
  type: "page-type/risk-activity",
  slug: "motorcycle",
  exposureUnit: "per 100 motorcycle vehicle-miles",
  micromortsPerUnitLow: 25.1,
  micromortsPerUnitCentral: 26.2,
  micromortsPerUnitHigh: 31.3,
  exposureAssumption:
    "Every injury rate is unverified, mostly borrowed injury-type shares applied to a total. Every disability duration is an assumption. These borrow the nearest GBD weight: Upper-limb fracture (shoulder/clavicle, arm, wrist); Lower-limb fracture (tibia/fibula, ankle, femur).",
  injuryDisability: [
    {
      injury: "Upper-limb fracture (shoulder/clavicle, arm, wrist)",
      injuriesPerMillionUnits: 54.8,
      disabilityWeight: 0.035,
      disabilityYears: 0.3,
    },
    {
      injury: "Lower-limb fracture (tibia/fibula, ankle, femur)",
      injuriesPerMillionUnits: 44.6,
      disabilityWeight: 0.05,
      disabilityYears: 0.5,
    },
    {
      injury: "Concussion / minor TBI",
      injuriesPerMillionUnits: 20.3,
      disabilityWeight: 0.11,
      disabilityYears: 0.1,
    },
    {
      injury: "Contusion / road rash",
      injuriesPerMillionUnits: 142.6,
      disabilityWeight: 0.008,
      disabilityYears: 0.04,
    },
    {
      injury: "Sprain/strain",
      injuriesPerMillionUnits: 46.7,
      disabilityWeight: 0.008,
      disabilityYears: 0.1,
    },
  ],
  sources: [
    {
      citation:
        "NHTSA, Traffic Safety Facts 2022 Data: Motorcycles (DOT HS 813 589, July 2024), Tables 1 and 2",
      url: "https://crashstats.nhtsa.dot.gov/Api/Public/Publication/813589",
    },
    {
      citation:
        "NHTSA, Overview of Motor Vehicle Traffic Crashes in 2022 (Traffic Safety Facts Research Note, DOT HS 813 560, April 2024), Table 4 (NSC-hosted copy)",
      url: "https://www.nsc.org/getmedia/5efb579f-6c0b-47e3-ab87-951e7c0d1dbc/adid-nhtsa-overview-of-mv-crashes-2022.pdf",
    },
    {
      citation: "IIHS-HLDI, Fatality Facts 2024: Yearly snapshot (FARS-based, posted 2026)",
      url: "https://www.iihs.org/research-areas/fatality-statistics/detail/yearly-snapshot",
    },
    {
      citation:
        "NHTSA, Lower-Extremity Injuries in Motorcycle Crashes (DOT HS 810 982, 2008), NTDB-NSP 2003-2005",
      url: "https://crashstats.nhtsa.dot.gov/Api/Public/ViewPublication/810982",
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
