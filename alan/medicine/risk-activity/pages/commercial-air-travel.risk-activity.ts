import type { RiskActivity } from "akasha/alan/medicine/risk-activity/risk-activity.page-type.types.ts"

export const commercialAirTravel = {
  id: "01a183ec-9551-7b24-bf5d-b2ad093a0dad",
  type: "page-type/risk-activity",
  slug: "commercial-air-travel",
  exposureUnit: "per flight (passenger boarding)",
  micromortsPerUnitLow: 0.0125,
  micromortsPerUnitCentral: 0.02,
  micromortsPerUnitHigh: 0.073,
  exposureAssumption:
    "The death rate is worldwide rather than US-only and predates the January 2025 Washington DC midair collision. Every injury rate is unverified, mostly borrowed injury-type shares applied to a total. Every disability duration is an assumption. These borrow the nearest GBD weight: Turbulence-related fracture (ankle, leg, spine).",
  injuryDisability: [
    {
      injury: "Turbulence-related fracture (ankle, leg, spine)",
      injuriesPerMillionUnits: 0.005,
      disabilityWeight: 0.05,
      disabilityYears: 0.3,
      injuriesPerMillionUnitsLow: 0.002,
      injuriesPerMillionUnitsHigh: 0.01,
      disabilityWeightLow: 0.032,
      disabilityWeightHigh: 0.075,
    },
  ],
  sources: [
    {
      citation:
        "Barnett A. Aviation Safety: A Whole New World? Transportation Science 2020;54(1):84-96 (as reported by MIT News, 24 Jan 2020)",
      url: "https://news.mit.edu/2020/study-commercial-flights-safer-ever-0124",
    },
    {
      citation:
        "Barnett A, Reig Torra J. Airline safety: Still getting better? J Air Transport Management 2024;119:102641 (as reported by MIT News, 7 Aug 2024)",
      url: "https://news.mit.edu/2024/study-flying-keeps-getting-safer-0807",
    },
    {
      citation:
        "Injuries Due to In-Flight Turbulence During United States Commercial Airline Flights (2008-2023), PubMed 41212176",
      url: "https://pubmed.ncbi.nlm.nih.gov/41212176/",
    },
  ],
  createdAt: "2026-10-28T19:11:22.447Z",
  updatedAt: "2026-10-28T19:22:46.075Z",
} as const satisfies RiskActivity
