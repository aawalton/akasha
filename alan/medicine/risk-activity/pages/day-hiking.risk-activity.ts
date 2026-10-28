import type { RiskActivity } from "akasha/alan/medicine/risk-activity/risk-activity.page-type.types.ts"

export const dayHiking = {
  id: "01a183ea-37b8-7225-9656-2d425e208b04",
  type: "page-type/risk-activity",
  slug: "day-hiking",
  exposureUnit: "per day (one day hike)",
  micromortsPerUnitLow: 0.22,
  micromortsPerUnitCentral: 0.32,
  micromortsPerUnitHigh: 0.68,
  exposureAssumption:
    "The death rate assumes 40% of national park visits include a day hike (25-60% for the range). The death figure is not verified against a source read in full. Every injury rate is unverified, mostly borrowed injury-type shares applied to a total. Every disability duration is an assumption.",
  injuryDisability: [
    {
      injury: "Fracture (mostly lower limb/ankle) treated in ED",
      injuriesPerMillionUnits: 24,
      disabilityWeight: 0.05,
      disabilityYears: 0.25,
    },
    {
      injury: "Sprain/strain (mostly ankle) treated in ED",
      injuriesPerMillionUnits: 21,
      disabilityWeight: 0.008,
      disabilityYears: 0.15,
    },
    {
      injury: "Traumatic brain injury (mostly concussion)",
      injuriesPerMillionUnits: 5.7,
      disabilityWeight: 0.11,
      disabilityYears: 0.1,
    },
  ],
  sources: [
    {
      citation:
        "National Park Service, Deaths in National Parks / mortality data page and FOIA spreadsheet 'NPS-Mortality-Data-CY2007-to-CY2026-Released.xlsx' (downloaded and tabulated)",
      url: "https://home.nps.gov/aboutus/mortality-data.htm",
    },
    {
      citation:
        "Owen MM et al. Musculoskeletal injuries during trail sports... Wilderness Environ Med 2024;35(2):138-146. PMID 38454756",
      url: "https://pubmed.ncbi.nlm.nih.gov/38454756/",
    },
    {
      citation:
        "Flores AH, Haileyesus T, Greenspan AI. National estimates of outdoor recreational injuries treated in EDs, US 2004-2005. Wilderness Environ Med 2008;19:91-8. PMID 18513117",
      url: "https://pubmed.ncbi.nlm.nih.gov/18513117/",
    },
    {
      citation: "SFIA 2022 Topline Participation Report",
      url: "https://www.usta.com/content/dam/usta/sections/intermountain/districts/colorado/pdfs/sfia-reports/2022-sfia-topline.pdf",
    },
    {
      citation: "USPA Parachutist, 'That's How We Roll: Ankle Injuries in Skydiving'",
      url: "https://parachutist.com/Article/thats-how-we-roll-ankle-injuries-in-skydiving",
    },
  ],
  createdAt: "2026-10-28T19:08:47.415Z",
  updatedAt: "2026-10-28T19:08:47.415Z",
} as const satisfies RiskActivity
