import type { CauseOfDeath } from "akasha/alan/medicine/cause-of-death/cause-of-death.page-type.types.ts"

export const colorectalCancer = {
  id: "01a183cc-d5e5-7449-9cd5-845ea3db6c71",
  type: "page-type/cause-of-death",
  slug: "colorectal-cancer",
  icd10Codes: ["C18-C21"],
  baselineRates: [
    {
      ageBandStart: 40,
      ageBandEnd: 44,
      deathsPerHundredThousand: 5.86,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 45,
      ageBandEnd: 49,
      deathsPerHundredThousand: 11.13,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 50,
      ageBandEnd: 54,
      deathsPerHundredThousand: 18.83,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 55,
      ageBandEnd: 59,
      deathsPerHundredThousand: 25.95,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 60,
      ageBandEnd: 64,
      deathsPerHundredThousand: 35.09,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 65,
      ageBandEnd: 69,
      deathsPerHundredThousand: 45.33,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 70,
      ageBandEnd: 74,
      deathsPerHundredThousand: 55.48,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 75,
      ageBandEnd: 79,
      deathsPerHundredThousand: 69.08,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 80,
      ageBandEnd: 84,
      deathsPerHundredThousand: 99.78,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 85,
      ageBandEnd: 120,
      deathsPerHundredThousand: 172.78,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
  ],
  riskFactors: [
    {
      factor: "red and processed meat",
      personProperty: "meat-servings-per-week",
      appliedAs: "per 100 g a day of red and processed meat combined, colorectal cancer incidence",
      relativeRiskLow: 1.04,
      relativeRiskCentral: 1.14,
      relativeRiskHigh: 1.24,
      citation:
        "Chan DSM, Lau R, Aune D, Vieira R, Greenwood DC, Kampman E, Norat T. Red and processed meat and colorectal cancer incidence: meta-analysis of prospective studies. PLoS One 2011;6(6):e20456. doi:10.1371/journal.pone.0020456",
      url: "https://pubmed.ncbi.nlm.nih.gov/21674008/",
    },
    {
      factor: "never smoking",
      personProperty: "tobacco-use",
      appliedAs:
        "never smoker vs US men; current RR 1.30 and former 1.23; low and high scale both excesses by the men 55+ current-smoker 95% CI (1.0-1.7 of 1.4)",
      relativeRiskLow: 0.799,
      relativeRiskCentral: 0.875,
      relativeRiskHigh: 1,
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
    {
      factor: "colonoscopy screening",
      personProperty: "colorectal-screening",
      appliedAs:
        "screened by colonoscopy against no screening, per-protocol (those who had it), colorectal cancer death over 10 years",
      relativeRiskLow: 0.27,
      relativeRiskCentral: 0.5,
      relativeRiskHigh: 0.77,
      citation:
        "Bretthauer M et al. Effect of Colonoscopy Screening on Risks of Colorectal Cancer and Related Death (NordICC). N Engl J Med 2022;387:1547-1556, per-protocol RR 0.50 (0.27-0.77); intention-to-screen RR 0.90 (0.64-1.16); ages 55-64. The 13-year update (DDW 2026, not yet peer reviewed) gives per-protocol 0.70 (0.26-1.25). Screened share: Sabatino SA et al. Use of Cancer Screening Tests, United States, 2023. Prev Chronic Dis 2025;22:E52, men 45-75 up to date 66.0%.",
      url: "https://www.wikijournalclub.org/wiki/NordICC",
    },
  ],
  createdAt: "2026-10-28T18:36:41.827Z",
  updatedAt: "2026-10-28T19:19:14.159Z",
} as const satisfies CauseOfDeath
