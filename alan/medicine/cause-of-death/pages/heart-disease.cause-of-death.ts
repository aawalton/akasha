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
      factor: "ADHD medication over 5 years, ischaemic heart disease",
      personProperty: "medications",
      appliedAs:
        "more than 5 years of cumulative ADHD medication vs none, among people with ADHD, incident ischaemic heart disease; adjusted OR, Table 2; not significant",
      relativeRiskLow: 0.7,
      relativeRiskCentral: 1.06,
      relativeRiskHigh: 1.6,
      citation:
        "Zhang L, Li L, Andell P, et al. Attention-Deficit/Hyperactivity Disorder Medications and Long-Term Risk of Cardiovascular Diseases. JAMA Psychiatry 2024;81(2):178-187. doi:10.1001/jamapsychiatry.2023.4294",
      url: "https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2811812",
    },
    {
      factor: "never smoking",
      personProperty: "tobacco-use",
      appliedAs:
        "never smoker vs US men; ischaemic heart disease current RR 2.17 and former 1.25; low and high scale both excesses by the men 55+ current-smoker 95% CI (1.9-2.2 of 2.0)",
      relativeRiskLow: 0.777,
      relativeRiskCentral: 0.807,
      relativeRiskHigh: 0.823,
      citation:
        "Lariscy JT, Hummer RA, Rogers RG. Cigarette Smoking and All-Cause and Cause-Specific Adult Mortality in the United States. Demography 2018;55(5):1855-1885, Table 2 (men 35+) and Table 8 (men 55+). Smoking shares: NCHS NHSR No. 145 (2020), men 65+ in 2018 were 49.4% former and 40.7% never smokers, 9.9% current by difference. Ratio = 1/(0.407 + 0.494 x former RR + 0.099 x current RR).",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6219821/",
    },
    {
      factor: "BMI",
      personProperty: "bodyweight",
      appliedAs: "per 5 BMI above 25, cardiovascular deaths (ICD-10 I), never-smokers",
      relativeRiskLow: 1.27,
      relativeRiskCentral: 1.29,
      relativeRiskHigh: 1.3,
      citation:
        "Bhaskaran K, dos-Santos-Silva I, Leon DA, Douglas IJ, Smeeth L. Association of BMI with overall and cause-specific mortality: a population-based cohort study of 3.6 million adults in the UK. Lancet Diabetes Endocrinol 2018;6(12):944-953, Table 2, never-smokers. The people's BMI is the US men 20+ mean of 29.4, NHANES August 2021-August 2023, NCHS Vital and Health Statistics Series 3 No. 50, Table 10.",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6249991/",
    },
  ],
  createdAt: "2026-10-28T18:35:44.261Z",
  updatedAt: "2026-10-28T19:10:39.459Z",
} as const satisfies CauseOfDeath
