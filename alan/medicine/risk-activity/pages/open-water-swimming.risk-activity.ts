import type { RiskActivity } from "akasha/alan/medicine/risk-activity/risk-activity.page-type.types.ts"

export const openWaterSwimming = {
  id: "01a183eb-b132-74ef-86f2-17f7e434fabb",
  type: "page-type/risk-activity",
  slug: "open-water-swimming",
  exposureUnit: "per swim session (day); triathlon value is per race swim",
  micromortsPerUnitLow: 0.6,
  micromortsPerUnitCentral: 2.6,
  micromortsPerUnitHigh: 10.3,
  exposureAssumption:
    "The death rate assumes how many swim-days a year people take and what share of drownings happen while swimming; its high end is a triathlon race swim. The death figure is not verified against a source read in full. Every injury rate is unverified, mostly borrowed injury-type shares applied to a total. Every disability duration is an assumption.",
  injuryDisability: [
    {
      injury: "Nonfatal drowning (ED-treated)",
      injuriesPerMillionUnits: 1.7,
      disabilityWeight: 0.247,
      disabilityYears: 0.1,
    },
  ],
  sources: [
    {
      citation: "Amin Foundation tabulation of CDC WONDER drowning by place and age, 2018-2024",
      url: "https://aminfoundation.io/data/by-age",
    },
    {
      citation: "MMWR 2024;73(20) Vital Signs drowning",
      url: "https://www.cdc.gov/mmwr/volumes/73/wr/mm7320e1.htm",
    },
    {
      citation:
        "Harris KM et al. Death and Cardiac Arrest in U.S. Triathlon Participants, 1985 to 2016. Ann Intern Med 2017;167:529-535. PMID 28975231",
      url: "https://pubmed.ncbi.nlm.nih.gov/28975231/",
    },
    {
      citation: "CDC MMWR 2012 Drowning 2005-2009; CDC Drowning Facts",
      url: "https://www.cdc.gov/mmwr/preview/mmwrhtml/mm6119a4.htm",
    },
  ],
  createdAt: "2026-10-28T19:10:24.049Z",
  updatedAt: "2026-10-28T19:10:24.049Z",
} as const satisfies RiskActivity
