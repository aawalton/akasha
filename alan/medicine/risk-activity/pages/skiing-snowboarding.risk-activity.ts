import type { RiskActivity } from "akasha/alan/medicine/risk-activity/risk-activity.page-type.types.ts"

export const skiingSnowboarding = {
  id: "01a183eb-b134-7eb0-ad8e-e8c1dae4e8a0",
  type: "page-type/risk-activity",
  slug: "skiing-snowboarding",
  exposureUnit: "per day (skier visit)",
  micromortsPerUnitLow: 0.58,
  micromortsPerUnitCentral: 0.74,
  micromortsPerUnitHigh: 0.93,
  exposureAssumption:
    "2 of 4 injury rates are unverified. 3 of 4 disability durations are assumptions. These borrow the nearest GBD weight: ACL tear; MCL / other knee sprain; Catastrophic TBI; Catastrophic spinal cord injury (paralysis).",
  injuryDisability: [
    {
      injury: "ACL tear",
      injuriesPerMillionUnits: 450,
      disabilityWeight: 0.113,
      disabilityYears: 0.5,
    },
    {
      injury: "MCL / other knee sprain",
      injuriesPerMillionUnits: 500,
      disabilityWeight: 0.008,
      disabilityYears: 0.15,
    },
    {
      injury: "Catastrophic TBI",
      injuriesPerMillionUnits: 0.45,
      disabilityWeight: 0.231,
      disabilityYears: 45,
    },
    {
      injury: "Catastrophic spinal cord injury (paralysis)",
      injuriesPerMillionUnits: 0.32,
      disabilityWeight: 0.296,
      disabilityYears: 45,
    },
  ],
  sources: [
    {
      citation:
        "Rosenbaum Injury Firm, Ski Injury Statistics (table of NSAA fatality data 2012-13 to 2023-24)",
      url: "https://www.rosenbauminjuryfirm.com/2023-ski-injury-statistics/",
    },
    {
      citation: "SnowBrains, Catastrophic Ski Injuries: what the data reveals (NSAA 2024-25)",
      url: "https://snowbrains.com/catastrophic-ski-injuries-what-the-data-reveals/",
    },
    {
      citation: "Reiff Law Firm, 2025 Ski Injury Statistics (citing NSAA 2024 fact sheets)",
      url: "https://www.reifflawfirm.com/2025-ski-injury-statistics/",
    },
    {
      citation:
        "Warme WJ et al. Ski injury statistics, 1982 to 1993, Jackson Hole. Am J Sports Med 1995;23:597-600. PMID 8526277",
      url: "https://pubmed.ncbi.nlm.nih.gov/8526277/",
    },
    {
      citation:
        "Davidson TM, Laliotis AT. Alpine skiing injuries: a nine-year study. West J Med 1996;164:310-4. PMID 8732730",
      url: "https://pubmed.ncbi.nlm.nih.gov/8732730/",
    },
    {
      citation:
        "Navarro Escarp et al. Ski Lesions Around the Knee: A Literature Review. IntechOpen 2019",
      url: "https://www.intechopen.com/chapters/65256",
    },
    {
      citation: "Patrick E et al. Orthop J Sports Med 2015 (Big Sky 1996 vs 2013). PMID 26665097",
      url: "https://pubmed.ncbi.nlm.nih.gov/26665097/",
    },
  ],
  createdAt: "2026-10-28T19:10:24.049Z",
  updatedAt: "2026-10-28T19:10:24.049Z",
} as const satisfies RiskActivity
