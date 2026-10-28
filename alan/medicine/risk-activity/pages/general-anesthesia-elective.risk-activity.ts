import type { RiskActivity } from "akasha/alan/medicine/risk-activity/risk-activity.page-type.types.ts"

export const generalAnesthesiaElective = {
  id: "01a183ec-9551-7e3c-83c0-9bc79a9306da",
  type: "page-type/risk-activity",
  slug: "general-anesthesia-elective",
  exposureUnit: "per event",
  micromortsPerUnitLow: 8.2,
  micromortsPerUnitCentral: 17,
  micromortsPerUnitHigh: 39,
  exposureAssumption:
    "The death rate counts deaths the anesthetic caused, from 1999-2005 US death certificates and a 2012 meta-analysis; no 2015 or later source was found. Surgical sepsis (7,000 per million in healthy patients) is left out because the surgery causes it rather than the anesthetic. The perioperative stroke rate is unverified. Every disability duration is an assumption. These borrow the nearest GBD weight: Perioperative stroke; Dental injury requiring repair/extraction; Accidental awareness under general anesthesia.",
  injuryDisability: [
    {
      injury: "Perioperative stroke",
      injuriesPerMillionUnits: 500,
      disabilityWeight: 0.019,
      disabilityYears: 10,
      injuriesPerMillionUnitsLow: 350,
      injuriesPerMillionUnitsHigh: 1000,
    },
    {
      injury: "Peripheral nerve injury (positioning/block)",
      injuriesPerMillionUnits: 300,
      disabilityWeight: 0.1,
      disabilityYears: 0.5,
      injuriesPerMillionUnitsLow: 200,
      injuriesPerMillionUnitsHigh: 770,
      disabilityWeightLow: 0.067,
      disabilityWeightHigh: 0.14,
    },
    {
      injury: "Dental injury requiring repair/extraction",
      injuriesPerMillionUnits: 220,
      disabilityWeight: 0.067,
      disabilityYears: 0.05,
      injuriesPerMillionUnitsLow: 220,
      injuriesPerMillionUnitsHigh: 360,
      disabilityWeightLow: 0.044,
      disabilityWeightHigh: 0.097,
    },
    {
      injury: "Accidental awareness under general anesthesia",
      injuriesPerMillionUnits: 51,
      disabilityWeight: 0.03,
      disabilityYears: 1,
      injuriesPerMillionUnitsLow: 43,
      injuriesPerMillionUnitsHigh: 1000,
    },
  ],
  sources: [
    {
      citation:
        "Li G, Warner M, Lang BH, Huang L, Sun LS. Epidemiology of anesthesia-related mortality in the United States, 1999-2005. Anesthesiology 2009;110:759-65",
      url: "https://pubmed.ncbi.nlm.nih.gov/19322941/",
    },
    {
      citation:
        "Bainbridge D et al. Perioperative and anaesthetic-related mortality in developed and developing countries: systematic review and meta-analysis. Lancet 2012;380:1075-81",
      url: "https://pubmed.ncbi.nlm.nih.gov/22998717/",
    },
    {
      citation:
        "Gabriel RA et al. Postoperative mortality and morbidity following non-cardiac surgery in a healthy patient population. J Anesth 2018;32:112-9",
      url: "https://pubmed.ncbi.nlm.nih.gov/?term=10.1007%2Fs00540-017-2440-1",
    },
    {
      citation:
        "Mashour GA, Shanks AM, Kheterpal S. Perioperative stroke and associated mortality after noncardiac, nonneurologic surgery. Anesthesiology 2011",
      url: "https://pubmed.ncbi.nlm.nih.gov/21478735/",
    },
    {
      citation:
        "Welch MB et al. Perioperative peripheral nerve injuries: a retrospective study of 380,680 cases. Anesthesiology 2009;111:490-7",
      url: "https://pubmed.ncbi.nlm.nih.gov/19672188/",
    },
    {
      citation:
        "Warner ME et al. Perianesthetic dental injuries: frequency, outcomes, and risk factors. Anesthesiology 1999;90:1302-5",
      url: "https://pubmed.ncbi.nlm.nih.gov/10319777/",
    },
    {
      citation:
        "Pandit JJ et al. 5th National Audit Project (NAP5) on accidental awareness during general anaesthesia. Br J Anaesth 2014",
      url: "https://pubmed.ncbi.nlm.nih.gov/25204697/",
    },
  ],
  createdAt: "2026-10-28T19:11:22.447Z",
  updatedAt: "2026-10-28T19:23:11.627Z",
} as const satisfies RiskActivity
