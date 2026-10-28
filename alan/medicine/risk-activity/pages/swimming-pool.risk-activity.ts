import type { RiskActivity } from "akasha/alan/medicine/risk-activity/risk-activity.page-type.types.ts"

export const swimmingPool = {
  id: "01a183eb-b134-76b3-a9fb-54751bddff4a",
  type: "page-type/risk-activity",
  slug: "swimming-pool",
  exposureUnit: "per pool session (day)",
  micromortsPerUnitLow: 0.11,
  micromortsPerUnitCentral: 0.22,
  micromortsPerUnitHigh: 0.42,
  exposureAssumption:
    "The death rate assumes how many swim-days a year people take and what share of drownings happen while swimming. The death figure is not verified against a source read in full. Every injury rate is unverified, mostly borrowed injury-type shares applied to a total. Every disability duration is an assumption.",
  injuryDisability: [
    {
      injury: "Nonfatal drowning (ED-treated)",
      injuriesPerMillionUnits: 0.48,
      disabilityWeight: 0.247,
      disabilityYears: 0.1,
    },
  ],
  sources: [
    {
      citation:
        "Amin Foundation tabulation of CDC WONDER Underlying Cause of Death, drowning by place and age, 2018-2024",
      url: "https://aminfoundation.io/data/by-age",
    },
    {
      citation:
        "Clemens T et al. Vital Signs: Drowning death rates, self-reported swimming skill... MMWR 2024;73(20)",
      url: "https://www.cdc.gov/mmwr/volumes/73/wr/mm7320e1.htm",
    },
    {
      citation: "SFIA 2022 Topline Participation Report",
      url: "https://www.usta.com/content/dam/usta/sections/intermountain/districts/colorado/pdfs/sfia-reports/2022-sfia-topline.pdf",
    },
    {
      citation: "CDC. Drowning - United States, 2005-2009. MMWR 2012;61(19)",
      url: "https://www.cdc.gov/mmwr/preview/mmwrhtml/mm6119a4.htm",
    },
    {
      citation: "CDC Drowning Facts",
      url: "https://www.cdc.gov/drowning/data-research/facts/index.html",
    },
  ],
  createdAt: "2026-10-28T19:10:24.049Z",
  updatedAt: "2026-10-28T19:10:24.049Z",
} as const satisfies RiskActivity
