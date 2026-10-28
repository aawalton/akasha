import type { CauseOfDeath } from "akasha/alan/medicine/cause-of-death/cause-of-death.page-type.types.ts"

export const heartDisease = {
  id: "01a183cb-f507-7945-9147-f2153c6610fb",
  type: "page-type/cause-of-death",
  slug: "heart-disease",
  icd10Codes: ["I00-I09", "I11", "I13", "I20-I51"],
  baselineRates: [
    {
      ageBandStart: 40,
      ageBandEnd: 44,
      deathsPerHundredThousand: 45.18,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 45,
      ageBandEnd: 49,
      deathsPerHundredThousand: 75.79,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 50,
      ageBandEnd: 54,
      deathsPerHundredThousand: 129.79,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 55,
      ageBandEnd: 59,
      deathsPerHundredThousand: 201.31,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 60,
      ageBandEnd: 64,
      deathsPerHundredThousand: 316.72,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 65,
      ageBandEnd: 69,
      deathsPerHundredThousand: 446.99,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 70,
      ageBandEnd: 74,
      deathsPerHundredThousand: 622.87,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 75,
      ageBandEnd: 79,
      deathsPerHundredThousand: 936.94,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 80,
      ageBandEnd: 84,
      deathsPerHundredThousand: 1627.22,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 85,
      ageBandEnd: 120,
      deathsPerHundredThousand: 4224.71,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
  ],
  riskFactors: [
    {
      factor: "daily steps",
      personProperty: "active-energy",
      appliedAs: "7,000 vs 2,000 steps a day, CVD mortality; inverse linear in steps",
      relativeRiskLow: 0.37,
      relativeRiskCentral: 0.53,
      relativeRiskHigh: 0.77,
      citation:
        "Ding D, Nguyen B, Nau T, et al. Daily steps and health outcomes in adults: a systematic review and dose-response meta-analysis. Lancet Public Health 2025;10(8):e668-e681. doi:10.1016/S2468-2667(25)00164-1",
      url: "https://pubmed.ncbi.nlm.nih.gov/40713949/",
    },
    {
      factor: "sleep duration",
      personProperty: "sleep",
      appliedAs: "per 1 hour of sleep above 7 hours, coronary heart disease",
      relativeRiskLow: 1,
      relativeRiskCentral: 1.05,
      relativeRiskHigh: 1.1,
      citation:
        "Yin J, Jin X, Shan Z, et al. Relationship of Sleep Duration With All-Cause Mortality and Cardiovascular Events: A Systematic Review and Dose-Response Meta-Analysis of Prospective Cohort Studies. J Am Heart Assoc 2017;6(9):e005947. doi:10.1161/JAHA.117.005947",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5634263/",
    },
    {
      factor: "red and processed meat",
      personProperty: "meat-servings-per-week",
      appliedAs: "per 1 serving a day (100 g red meat or 50 g processed meat), CVD mortality",
      relativeRiskLow: 1.14,
      relativeRiskCentral: 1.19,
      relativeRiskHigh: 1.25,
      citation:
        "Wang X, Lin X, Ouyang YY, Liu J, Zhao G, Pan A, Hu FB. Red and processed meat consumption and mortality: dose-response meta-analysis of prospective cohort studies. Public Health Nutr 2016;19(5):893-905. doi:10.1017/S1368980015002062",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10270853/",
    },
    {
      factor: "long-term ADHD medication",
      personProperty: "medications",
      appliedAs:
        "per 1 year of cumulative use vs no ADHD medication among people with ADHD, incident CVD",
      relativeRiskLow: 1.03,
      relativeRiskCentral: 1.04,
      relativeRiskHigh: 1.05,
      citation:
        "Zhang L, Li L, Andell P, et al. Attention-Deficit/Hyperactivity Disorder Medications and Long-Term Risk of Cardiovascular Diseases. JAMA Psychiatry 2024;81(2):178-187. doi:10.1001/jamapsychiatry.2023.4294",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10851097/",
    },
  ],
  createdAt: "2026-10-28T18:35:44.261Z",
  updatedAt: "2026-10-28T18:41:23.171Z",
} as const satisfies CauseOfDeath
