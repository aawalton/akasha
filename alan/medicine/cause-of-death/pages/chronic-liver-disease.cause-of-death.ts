import type { CauseOfDeath } from "akasha/alan/medicine/cause-of-death/cause-of-death.page-type.types.ts"

export const chronicLiverDisease = {
  id: "01a183d0-491d-770d-81d8-81d8bd841af7",
  type: "page-type/cause-of-death",
  slug: "chronic-liver-disease",
  icd10Codes: ["K70", "K73-K74"],
  baselineRates: [
    {
      ageBandStart: 40,
      ageBandEnd: 44,
      deathsPerHundredThousand: 16.76,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 45,
      ageBandEnd: 49,
      deathsPerHundredThousand: 22.12,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 50,
      ageBandEnd: 54,
      deathsPerHundredThousand: 30,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 55,
      ageBandEnd: 59,
      deathsPerHundredThousand: 40.4,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 60,
      ageBandEnd: 64,
      deathsPerHundredThousand: 48.49,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 65,
      ageBandEnd: 69,
      deathsPerHundredThousand: 51.7,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 70,
      ageBandEnd: 74,
      deathsPerHundredThousand: 49.04,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 75,
      ageBandEnd: 79,
      deathsPerHundredThousand: 45.94,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 80,
      ageBandEnd: 84,
      deathsPerHundredThousand: 47.91,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 85,
      ageBandEnd: 120,
      deathsPerHundredThousand: 45.03,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
  ],
  riskFactors: [
    {
      factor: "never drinking",
      personProperty: "alcohol-drinks-per-week",
      appliedAs:
        "never drinker vs the US: 1 minus the alcohol-related share of cirrhosis deaths, 50.3% in 2023; range from that share's 2000-2023 span of 43.6-54.3%; both sexes",
      relativeRiskLow: 0.457,
      relativeRiskCentral: 0.497,
      relativeRiskHigh: 0.564,
      citation:
        "NIAAA Surveillance Report #123, Liver Cirrhosis Mortality in the United States: National, State, and Regional Trends, 2000-2023. Alcohol-related cirrhosis is ICD-10 K70; the report warns alcohol involvement can be significantly underreported.",
      url: "https://www.niaaa.nih.gov/publications/surveillance-reports/surveillance123",
    },
    {
      factor: "BMI",
      personProperty: "bodyweight",
      appliedAs: "per 5 BMI above 23, liver cirrhosis deaths, never-smokers",
      relativeRiskLow: 1.33,
      relativeRiskCentral: 1.44,
      relativeRiskHigh: 1.55,
      citation:
        "Bhaskaran K, dos-Santos-Silva I, Leon DA, Douglas IJ, Smeeth L. Association of BMI with overall and cause-specific mortality: a population-based cohort study of 3.6 million adults in the UK. Lancet Diabetes Endocrinol 2018;6(12):944-953, Table 2, never-smokers. The people's BMI is the US men 20+ mean of 29.4, NHANES August 2021-August 2023, NCHS Vital and Health Statistics Series 3 No. 50, Table 10.",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6249991/",
    },
  ],
  createdAt: "2026-10-28T18:40:27.931Z",
  updatedAt: "2026-10-28T19:10:39.459Z",
} as const satisfies CauseOfDeath
