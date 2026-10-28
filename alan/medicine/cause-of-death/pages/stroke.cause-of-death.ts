import type { CauseOfDeath } from "akasha/alan/medicine/cause-of-death/cause-of-death.page-type.types.ts"

export const stroke = {
  id: "01a183cd-e814-7531-b169-42af8876b23d",
  type: "page-type/cause-of-death",
  slug: "stroke",
  icd10Codes: ["I60-I69"],
  baselineRates: [
    {
      ageBandStart: 40,
      ageBandEnd: 44,
      deathsPerHundredThousand: 7.2,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 45,
      ageBandEnd: 49,
      deathsPerHundredThousand: 11.32,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 50,
      ageBandEnd: 54,
      deathsPerHundredThousand: 18.43,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 55,
      ageBandEnd: 59,
      deathsPerHundredThousand: 29.59,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 60,
      ageBandEnd: 64,
      deathsPerHundredThousand: 46.93,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 65,
      ageBandEnd: 69,
      deathsPerHundredThousand: 71.55,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 70,
      ageBandEnd: 74,
      deathsPerHundredThousand: 116.82,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 75,
      ageBandEnd: 79,
      deathsPerHundredThousand: 194.41,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 80,
      ageBandEnd: 84,
      deathsPerHundredThousand: 374.75,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 85,
      ageBandEnd: 120,
      deathsPerHundredThousand: 952.73,
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
      appliedAs: "per 1 hour of sleep above 7 hours, stroke",
      relativeRiskLow: 1.14,
      relativeRiskCentral: 1.18,
      relativeRiskHigh: 1.21,
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
      factor: "ADHD medication up to 1 year, cerebrovascular disease",
      personProperty: "medications",
      appliedAs:
        "0 to 1 year of cumulative ADHD medication vs none, among people with ADHD, incident cerebrovascular disease; adjusted OR, Table 2; not significant",
      relativeRiskLow: 0.72,
      relativeRiskCentral: 0.93,
      relativeRiskHigh: 1.2,
      citation:
        "Zhang L, Li L, Andell P, et al. Attention-Deficit/Hyperactivity Disorder Medications and Long-Term Risk of Cardiovascular Diseases. JAMA Psychiatry 2024;81(2):178-187. doi:10.1001/jamapsychiatry.2023.4294",
      url: "https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2811812",
    },
    {
      factor: "ADHD medication 1 to 2 years, cerebrovascular disease",
      personProperty: "medications",
      appliedAs:
        "1 to 2 years of cumulative ADHD medication vs none, among people with ADHD, incident cerebrovascular disease; adjusted OR, Table 2; not significant",
      relativeRiskLow: 0.73,
      relativeRiskCentral: 0.97,
      relativeRiskHigh: 1.31,
      citation:
        "Zhang L, Li L, Andell P, et al. Attention-Deficit/Hyperactivity Disorder Medications and Long-Term Risk of Cardiovascular Diseases. JAMA Psychiatry 2024;81(2):178-187. doi:10.1001/jamapsychiatry.2023.4294",
      url: "https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2811812",
    },
    {
      factor: "ADHD medication 2 to 3 years, cerebrovascular disease",
      personProperty: "medications",
      appliedAs:
        "2 to 3 years of cumulative ADHD medication vs none, among people with ADHD, incident cerebrovascular disease; adjusted OR, Table 2; not significant",
      relativeRiskLow: 0.6,
      relativeRiskCentral: 0.85,
      relativeRiskHigh: 1.22,
      citation:
        "Zhang L, Li L, Andell P, et al. Attention-Deficit/Hyperactivity Disorder Medications and Long-Term Risk of Cardiovascular Diseases. JAMA Psychiatry 2024;81(2):178-187. doi:10.1001/jamapsychiatry.2023.4294",
      url: "https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2811812",
    },
    {
      factor: "ADHD medication 3 to 5 years, cerebrovascular disease",
      personProperty: "medications",
      appliedAs:
        "3 to 5 years of cumulative ADHD medication vs none, among people with ADHD, incident cerebrovascular disease; adjusted OR, Table 2; not significant",
      relativeRiskLow: 0.8,
      relativeRiskCentral: 1.1,
      relativeRiskHigh: 1.52,
      citation:
        "Zhang L, Li L, Andell P, et al. Attention-Deficit/Hyperactivity Disorder Medications and Long-Term Risk of Cardiovascular Diseases. JAMA Psychiatry 2024;81(2):178-187. doi:10.1001/jamapsychiatry.2023.4294",
      url: "https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2811812",
    },
    {
      factor: "ADHD medication over 5 years, cerebrovascular disease",
      personProperty: "medications",
      appliedAs:
        "more than 5 years of cumulative ADHD medication vs none, among people with ADHD, incident cerebrovascular disease; adjusted OR, Table 2; not significant",
      relativeRiskLow: 0.51,
      relativeRiskCentral: 0.74,
      relativeRiskHigh: 1.07,
      citation:
        "Zhang L, Li L, Andell P, et al. Attention-Deficit/Hyperactivity Disorder Medications and Long-Term Risk of Cardiovascular Diseases. JAMA Psychiatry 2024;81(2):178-187. doi:10.1001/jamapsychiatry.2023.4294",
      url: "https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2811812",
    },
    {
      factor: "never smoking",
      personProperty: "tobacco-use",
      appliedAs:
        "never smoker vs US men; stroke current RR 1.56 and former 1.07; low and high scale both excesses by the men 55+ current-smoker 95% CI (1.3-1.8 of 1.5)",
      relativeRiskLow: 0.874,
      relativeRiskCentral: 0.917,
      relativeRiskHigh: 0.949,
      citation:
        "Lariscy JT, Hummer RA, Rogers RG. Cigarette Smoking and All-Cause and Cause-Specific Adult Mortality in the United States. Demography 2018;55(5):1855-1885, Table 2 (men 35+) and Table 8 (men 55+). Smoking shares: NCHS NHSR No. 145 (2020), men 65+ in 2018 were 49.4% former and 40.7% never smokers, 9.9% current by difference. Ratio = 1/(0.407 + 0.494 x former RR + 0.099 x current RR).",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6219821/",
    },
    {
      factor: "BMI",
      personProperty: "bodyweight",
      appliedAs:
        "per 5 BMI above 25, cardiovascular deaths (ICD-10 I), never-smokers; the source says the link is more muted for cerebrovascular deaths",
      relativeRiskLow: 1.27,
      relativeRiskCentral: 1.29,
      relativeRiskHigh: 1.3,
      citation:
        "Bhaskaran K, dos-Santos-Silva I, Leon DA, Douglas IJ, Smeeth L. Association of BMI with overall and cause-specific mortality: a population-based cohort study of 3.6 million adults in the UK. Lancet Diabetes Endocrinol 2018;6(12):944-953, Table 2, never-smokers. The people's BMI is the US men 20+ mean of 29.4, NHANES August 2021-August 2023, NCHS Vital and Health Statistics Series 3 No. 50, Table 10.",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6249991/",
    },
    {
      factor: "muscle-strengthening activity, cardiovascular disease",
      personProperty: "strength-sets",
      appliedAs:
        "60 minutes a week of muscle-strengthening activity, the curve's lowest point, vs none; cardiovascular disease, incidence and mortality pooled",
      relativeRiskLow: 0.76,
      relativeRiskCentral: 0.82,
      relativeRiskHigh: 0.9,
      citation:
        "Momma H et al. Br J Sports Med 2022;56(13):755-763. doi:10.1136/bjsports-2021-105061",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9209691/",
    },
    {
      factor: "cardiorespiratory fitness",
      personProperty: "vo2max",
      appliedAs:
        "per 1 MET higher maximal aerobic capacity, coronary heart disease and CVD events; the source merges the two, so stroke is approximate",
      relativeRiskLow: 0.82,
      relativeRiskCentral: 0.85,
      relativeRiskHigh: 0.88,
      citation: "Kodama S et al. JAMA 2009;301(19):2024-2035. doi:10.1001/jama.2009.681",
      url: "https://pubmed.ncbi.nlm.nih.gov/19454641/",
    },
    {
      factor: "fruit and vegetables, stroke",
      personProperty: "fruit-vegetable-grams-per-day",
      appliedAs: "per 200 g a day of fruit and vegetables, stroke incidence and mortality",
      relativeRiskLow: 0.76,
      relativeRiskCentral: 0.84,
      relativeRiskHigh: 0.92,
      citation:
        "Aune D, Giovannucci E, Boffetta P, et al. Fruit and vegetable intake and the risk of cardiovascular disease, total cancer and all-cause mortality: a systematic review and dose-response meta-analysis of prospective studies. Int J Epidemiol 2017;46(3):1029-1056. doi:10.1093/ije/dyw319",
      url: "https://pubmed.ncbi.nlm.nih.gov/28338764/",
    },
    {
      factor: "sauna 2 to 3 times a week, cardiovascular death",
      personProperty: "sauna-sessions-per-week",
      appliedAs: "2 to 3 sauna sessions a week vs 1, fatal cardiovascular disease, Finnish men",
      relativeRiskLow: 0.59,
      relativeRiskCentral: 0.73,
      relativeRiskHigh: 0.89,
      citation:
        "Laukkanen T et al. JAMA Intern Med 2015;175(4):542-548, Table 2. doi:10.1001/jamainternmed.2014.8187",
      url: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2130724",
    },
    {
      factor: "sauna 4 to 7 times a week, cardiovascular death",
      personProperty: "sauna-sessions-per-week",
      appliedAs: "4 to 7 sauna sessions a week vs 1, fatal cardiovascular disease, Finnish men",
      relativeRiskLow: 0.33,
      relativeRiskCentral: 0.5,
      relativeRiskHigh: 0.77,
      citation:
        "Laukkanen T et al. JAMA Intern Med 2015;175(4):542-548, Table 2. doi:10.1001/jamainternmed.2014.8187",
      url: "https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2130724",
    },
    {
      factor: "hot tub bathing almost daily, stroke",
      personProperty: "hot-baths-per-week",
      appliedAs:
        "tub bathing almost daily or daily vs 0 to 2 times a week, incident total stroke, Japanese adults",
      relativeRiskLow: 0.62,
      relativeRiskCentral: 0.74,
      relativeRiskHigh: 0.87,
      citation:
        "Ukai T, et al. Habitual tub bathing and risks of incident coronary heart disease and stroke. Heart 2020;106(10):732-737. doi:10.1136/heartjnl-2019-315752",
      url: "https://pubmed.ncbi.nlm.nih.gov/32209614/",
    },
  ],
  createdAt: "2026-10-28T18:37:52.016Z",
  updatedAt: "2026-10-28T20:11:45.142Z",
} as const satisfies CauseOfDeath
