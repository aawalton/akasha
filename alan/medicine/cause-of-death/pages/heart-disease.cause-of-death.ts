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
      factor: "ADHD medication up to 1 year, ischaemic heart disease",
      personProperty: "medications",
      appliedAs:
        "0 to 1 year of cumulative ADHD medication vs none, among people with ADHD, incident ischaemic heart disease; adjusted OR, Table 2; not significant",
      relativeRiskLow: 0.69,
      relativeRiskCentral: 0.94,
      relativeRiskHigh: 1.28,
      citation:
        "Zhang L, Li L, Andell P, et al. Attention-Deficit/Hyperactivity Disorder Medications and Long-Term Risk of Cardiovascular Diseases. JAMA Psychiatry 2024;81(2):178-187. doi:10.1001/jamapsychiatry.2023.4294",
      url: "https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2811812",
    },
    {
      factor: "ADHD medication 1 to 2 years, ischaemic heart disease",
      personProperty: "medications",
      appliedAs:
        "1 to 2 years of cumulative ADHD medication vs none, among people with ADHD, incident ischaemic heart disease; adjusted OR, Table 2; not significant",
      relativeRiskLow: 0.49,
      relativeRiskCentral: 0.72,
      relativeRiskHigh: 1.06,
      citation:
        "Zhang L, Li L, Andell P, et al. Attention-Deficit/Hyperactivity Disorder Medications and Long-Term Risk of Cardiovascular Diseases. JAMA Psychiatry 2024;81(2):178-187. doi:10.1001/jamapsychiatry.2023.4294",
      url: "https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2811812",
    },
    {
      factor: "ADHD medication 2 to 3 years, ischaemic heart disease",
      personProperty: "medications",
      appliedAs:
        "2 to 3 years of cumulative ADHD medication vs none, among people with ADHD, incident ischaemic heart disease; adjusted OR, Table 2; not significant",
      relativeRiskLow: 0.73,
      relativeRiskCentral: 1.09,
      relativeRiskHigh: 1.65,
      citation:
        "Zhang L, Li L, Andell P, et al. Attention-Deficit/Hyperactivity Disorder Medications and Long-Term Risk of Cardiovascular Diseases. JAMA Psychiatry 2024;81(2):178-187. doi:10.1001/jamapsychiatry.2023.4294",
      url: "https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2811812",
    },
    {
      factor: "ADHD medication 3 to 5 years, ischaemic heart disease",
      personProperty: "medications",
      appliedAs:
        "3 to 5 years of cumulative ADHD medication vs none, among people with ADHD, incident ischaemic heart disease; adjusted OR, Table 2; not significant",
      relativeRiskLow: 0.82,
      relativeRiskCentral: 1.2,
      relativeRiskHigh: 1.77,
      citation:
        "Zhang L, Li L, Andell P, et al. Attention-Deficit/Hyperactivity Disorder Medications and Long-Term Risk of Cardiovascular Diseases. JAMA Psychiatry 2024;81(2):178-187. doi:10.1001/jamapsychiatry.2023.4294",
      url: "https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2811812",
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
      appliedAs: "per 1 MET higher maximal aerobic capacity, coronary heart disease and CVD events",
      relativeRiskLow: 0.82,
      relativeRiskCentral: 0.85,
      relativeRiskHigh: 0.88,
      citation: "Kodama S et al. JAMA 2009;301(19):2024-2035. doi:10.1001/jama.2009.681",
      url: "https://pubmed.ncbi.nlm.nih.gov/19454641/",
    },
    {
      factor: "nuts, coronary heart disease",
      personProperty: "nuts-grams-per-day",
      appliedAs: "per 28 g a day of nuts, coronary heart disease, incidence and mortality combined",
      relativeRiskLow: 0.63,
      relativeRiskCentral: 0.71,
      relativeRiskHigh: 0.8,
      citation:
        "Aune D, Keum N, Giovannucci E, et al. Nut consumption and risk of cardiovascular disease, total cancer, all-cause and cause-specific mortality: a systematic review and dose-response meta-analysis of prospective studies. BMC Med 2016;14:207. doi:10.1186/s12916-016-0730-3",
      url: "https://pubmed.ncbi.nlm.nih.gov/27916000/",
    },
    {
      factor: "whole grains, coronary heart disease",
      personProperty: "whole-grain-grams-per-day",
      appliedAs: "per 90 g a day of whole grain, coronary heart disease",
      relativeRiskLow: 0.75,
      relativeRiskCentral: 0.81,
      relativeRiskHigh: 0.87,
      citation:
        "Aune D, Keum N, Giovannucci E, et al. Whole grain consumption and risk of cardiovascular disease, cancer, and all cause and cause specific mortality: systematic review and dose-response meta-analysis of prospective studies. BMJ 2016;353:i2716. doi:10.1136/bmj.i2716",
      url: "https://pubmed.ncbi.nlm.nih.gov/27301975/",
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
      factor: "hot tub bathing almost daily, coronary heart disease",
      personProperty: "hot-baths-per-week",
      appliedAs:
        "tub bathing almost daily or daily vs 0 to 2 times a week, incident coronary heart disease, Japanese adults",
      relativeRiskLow: 0.45,
      relativeRiskCentral: 0.65,
      relativeRiskHigh: 0.94,
      citation:
        "Ukai T, et al. Habitual tub bathing and risks of incident coronary heart disease and stroke. Heart 2020;106(10):732-737. doi:10.1136/heartjnl-2019-315752",
      url: "https://pubmed.ncbi.nlm.nih.gov/32209614/",
    },
  ],
  createdAt: "2026-10-28T18:35:44.261Z",
  updatedAt: "2026-10-28T20:11:45.142Z",
} as const satisfies CauseOfDeath
