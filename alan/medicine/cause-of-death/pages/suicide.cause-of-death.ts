import type { CauseOfDeath } from "akasha/alan/medicine/cause-of-death/cause-of-death.page-type.types.ts"

export const suicide = {
  id: "01a183cf-0c3d-77a5-8d9c-ce0aff01d7de",
  type: "page-type/cause-of-death",
  slug: "suicide",
  icd10Codes: ["*U03", "X60-X84", "Y87.0"],
  baselineRates: [
    {
      ageBandStart: 40,
      ageBandEnd: 44,
      deathsPerHundredThousand: 29.66,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 45,
      ageBandEnd: 49,
      deathsPerHundredThousand: 28.21,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 50,
      ageBandEnd: 54,
      deathsPerHundredThousand: 30.37,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 55,
      ageBandEnd: 59,
      deathsPerHundredThousand: 30.5,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 60,
      ageBandEnd: 64,
      deathsPerHundredThousand: 29.25,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 65,
      ageBandEnd: 69,
      deathsPerHundredThousand: 24.49,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 70,
      ageBandEnd: 74,
      deathsPerHundredThousand: 28.38,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 75,
      ageBandEnd: 79,
      deathsPerHundredThousand: 33.21,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 80,
      ageBandEnd: 84,
      deathsPerHundredThousand: 43.62,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 85,
      ageBandEnd: 120,
      deathsPerHundredThousand: 50.95,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
  ],
  riskFactors: [
    {
      factor: "ADHD",
      personProperty: "health-conditions",
      appliedAs:
        "adults with ADHD vs without, adjusted for later psychiatric disorders (Model 4), suicide",
      relativeRiskLow: 0.88,
      relativeRiskCentral: 1.13,
      relativeRiskHigh: 1.45,
      citation:
        "Sun S, Kuja-Halkola R, Faraone SV, et al. Association of Psychiatric Comorbidity With the Risk of Premature Death Among Children and Adults With ADHD. JAMA Psychiatry 2019;76(11):1141-1149. doi:10.1001/jamapsychiatry.2019.1944",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6686979/",
    },
    {
      factor: "stimulant ADHD medication",
      personProperty: "medications",
      appliedAs:
        "on vs off stimulant treatment in the same patient, suicide-related events (attempts and deaths)",
      relativeRiskLow: 0.7,
      relativeRiskCentral: 0.81,
      relativeRiskHigh: 0.94,
      citation:
        "Chen Q, Sjolander A, Runeson B, D'Onofrio BM, Lichtenstein P, Larsson H. Drug treatment for attention-deficit/hyperactivity disorder and suicidal behaviour: register based study. BMJ 2014;348:g3769. doi:10.1136/bmj.g3769",
      url: "https://pubmed.ncbi.nlm.nih.gov/24942388/",
    },
    {
      factor: "depression",
      personProperty: "safety-level",
      appliedAs: "depression vs the general population, suicide (standardized mortality ratio)",
      relativeRiskLow: 12.2,
      relativeRiskCentral: 19.7,
      relativeRiskHigh: 32,
      citation:
        "Chesney E, Goodwin GM, Fazel S. Risks of all-cause and suicide mortality in mental disorders: a meta-review. World Psychiatry 2014;13(2):153-60. doi:10.1002/wps.20128",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4102288/",
    },
    {
      factor: "suicidal ideation without an attempt",
      personProperty: "safety-level",
      appliedAs:
        "ideation vs none within an affective-disorder population, completed suicide; applies on top of depression",
      relativeRiskLow: 1.43,
      relativeRiskCentral: 2.35,
      relativeRiskHigh: 3.87,
      citation:
        "Hubers AAM, Moaddine S, Peersmann SHM, et al. Suicidal ideation and subsequent completed suicide in both psychiatric and non-psychiatric populations: a meta-analysis. Epidemiol Psychiatr Sci 2018;27(2):186-198. doi:10.1017/S2045796016001049",
      url: "https://pubmed.ncbi.nlm.nih.gov/27989254/",
    },
  ],
  createdAt: "2026-10-28T18:39:06.808Z",
  updatedAt: "2026-10-28T18:42:01.465Z",
} as const satisfies CauseOfDeath
