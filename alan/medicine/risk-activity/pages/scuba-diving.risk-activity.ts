import type { RiskActivity } from "akasha/alan/medicine/risk-activity/risk-activity.page-type.types.ts"

export const scubaDiving = {
  id: "01a183ed-755b-75b5-b8a1-f9a187631a73",
  type: "page-type/risk-activity",
  slug: "scuba-diving",
  exposureUnit: "per dive",
  micromortsPerUnitLow: 1.8,
  micromortsPerUnitCentral: 1.8,
  micromortsPerUnitHigh: 10.3,
  exposureAssumption:
    "Every disability duration is an assumption. These borrow the nearest GBD weight: Decompression sickness; ED-treated scuba injury (barotrauma, etc.).",
  injuryDisability: [
    {
      injury: "Decompression sickness",
      injuriesPerMillionUnits: 300,
      disabilityWeight: 0.1,
      disabilityYears: 0.05,
      injuriesPerMillionUnitsLow: 200,
      injuriesPerMillionUnitsHigh: 400,
      disabilityWeightLow: 0.067,
      disabilityWeightHigh: 0.14,
    },
    {
      injury: "ED-treated scuba injury (barotrauma, etc.)",
      injuriesPerMillionUnits: 46,
      disabilityWeight: 0.008,
      disabilityYears: 0.05,
      injuriesPerMillionUnitsLow: 40,
      injuriesPerMillionUnitsHigh: 52,
      disabilityWeightLow: 0.003,
      disabilityWeightHigh: 0.015,
    },
  ],
  sources: [
    {
      citation:
        "Buzzacott P, Schiller D, Crain J, Denoble PJ. Epidemiology of morbidity and mortality in US and Canadian recreational scuba diving. Public Health 2018;155:62-68. PMID 29306625",
      url: "https://pubmed.ncbi.nlm.nih.gov/29306625/",
    },
    {
      citation: "Wikipedia, Scuba diving fatalities (citing Vann & Lang 2011 DAN workshop)",
      url: "https://en.wikipedia.org/wiki/Scuba_diving_fatalities",
    },
    {
      citation: "Merck Manual Professional: Decompression Sickness",
      url: "https://www.merckmanuals.com/professional/injuries-poisoning/injury-during-diving-or-work-in-compressed-air/decompression-sickness",
    },
    {
      citation: "SFIA 2022 Topline Participation Report",
      url: "https://www.usta.com/content/dam/usta/sections/intermountain/districts/colorado/pdfs/sfia-reports/2022-sfia-topline.pdf",
    },
  ],
  createdAt: "2026-10-28T19:12:19.801Z",
  updatedAt: "2026-10-28T19:22:46.075Z",
} as const satisfies RiskActivity
