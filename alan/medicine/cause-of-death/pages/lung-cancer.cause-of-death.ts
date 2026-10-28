import type { CauseOfDeath } from "akasha/alan/medicine/cause-of-death/cause-of-death.page-type.types.ts"

export const lungCancer = {
  id: "01a183cc-d5e6-77b0-ab52-b6d111708aff",
  type: "page-type/cause-of-death",
  slug: "lung-cancer",
  icd10Codes: ["C33-C34"],
  baselineRates: [
    {
      ageBandStart: 40,
      ageBandEnd: 44,
      deathsPerHundredThousand: 2.63,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 45,
      ageBandEnd: 49,
      deathsPerHundredThousand: 6.21,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 50,
      ageBandEnd: 54,
      deathsPerHundredThousand: 15.47,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 55,
      ageBandEnd: 59,
      deathsPerHundredThousand: 34.07,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 60,
      ageBandEnd: 64,
      deathsPerHundredThousand: 74.91,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 65,
      ageBandEnd: 69,
      deathsPerHundredThousand: 123.35,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 70,
      ageBandEnd: 74,
      deathsPerHundredThousand: 167.8,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 75,
      ageBandEnd: 79,
      deathsPerHundredThousand: 225.23,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 80,
      ageBandEnd: 84,
      deathsPerHundredThousand: 291.62,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 85,
      ageBandEnd: 120,
      deathsPerHundredThousand: 327.79,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
  ],
  riskFactors: [
    {
      factor: "never smoking",
      personProperty: "tobacco-use",
      appliedAs:
        "never smoker vs US men; current RR 13.79 and former 4.36; low and high scale both excesses by the men 55+ current-smoker 95% CI (10.9-16.1 of 13.3)",
      relativeRiskLow: 0.218,
      relativeRiskCentral: 0.255,
      relativeRiskHigh: 0.298,
      citation:
        "Lariscy JT, Hummer RA, Rogers RG. Cigarette Smoking and All-Cause and Cause-Specific Adult Mortality in the United States. Demography 2018;55(5):1855-1885, Table 2 (men 35+) and Table 8 (men 55+). Smoking shares: NCHS NHSR No. 145 (2020), men 65+ in 2018 were 49.4% former and 40.7% never smokers, 9.9% current by difference. Ratio = 1/(0.407 + 0.494 x former RR + 0.099 x current RR).",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6219821/",
    },
    {
      factor: "BMI",
      personProperty: "bodyweight",
      appliedAs: "per 5 BMI above 21, all cancer deaths (ICD-10 C), never-smokers",
      relativeRiskLow: 1.12,
      relativeRiskCentral: 1.13,
      relativeRiskHigh: 1.14,
      citation:
        "Bhaskaran K, dos-Santos-Silva I, Leon DA, Douglas IJ, Smeeth L. Association of BMI with overall and cause-specific mortality: a population-based cohort study of 3.6 million adults in the UK. Lancet Diabetes Endocrinol 2018;6(12):944-953, Table 2, never-smokers. The people's BMI is the US men 20+ mean of 29.4, NHANES August 2021-August 2023, NCHS Vital and Health Statistics Series 3 No. 50, Table 10.",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6249991/",
    },
  ],
  createdAt: "2026-10-28T18:36:41.827Z",
  updatedAt: "2026-10-28T19:10:39.459Z",
} as const satisfies CauseOfDeath
