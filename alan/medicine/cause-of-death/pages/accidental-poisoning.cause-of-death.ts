import type { CauseOfDeath } from "akasha/alan/medicine/cause-of-death/cause-of-death.page-type.types.ts"

export const accidentalPoisoning = {
  id: "01a183cf-0c3a-75b2-b763-e3a1477f5797",
  type: "page-type/cause-of-death",
  slug: "accidental-poisoning",
  icd10Codes: ["X40-X49"],
  baselineRates: [
    {
      ageBandStart: 40,
      ageBandEnd: 44,
      deathsPerHundredThousand: 62.47,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 45,
      ageBandEnd: 49,
      deathsPerHundredThousand: 57.11,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 50,
      ageBandEnd: 54,
      deathsPerHundredThousand: 54.37,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 55,
      ageBandEnd: 59,
      deathsPerHundredThousand: 57.15,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 60,
      ageBandEnd: 64,
      deathsPerHundredThousand: 50.6,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 65,
      ageBandEnd: 69,
      deathsPerHundredThousand: 36.36,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 70,
      ageBandEnd: 74,
      deathsPerHundredThousand: 17.55,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 75,
      ageBandEnd: 79,
      deathsPerHundredThousand: 8.15,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 80,
      ageBandEnd: 84,
      deathsPerHundredThousand: 4.49,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 85,
      ageBandEnd: 120,
      deathsPerHundredThousand: 3.48,
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
        "adults with ADHD vs without, adjusted for later psychiatric disorders (Model 4), unintentional injury",
      relativeRiskLow: 1.71,
      relativeRiskCentral: 2.14,
      relativeRiskHigh: 2.68,
      citation:
        "Sun S, Kuja-Halkola R, Faraone SV, et al. Association of Psychiatric Comorbidity With the Risk of Premature Death Among Children and Adults With ADHD. JAMA Psychiatry 2019;76(11):1141-1149. doi:10.1001/jamapsychiatry.2019.1944",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6686979/",
    },
    {
      factor: "ADHD medication",
      personProperty: "medications",
      appliedAs:
        "medication initiated vs not, unnatural-cause mortality (injury, suicide, poisoning)",
      relativeRiskLow: 0.66,
      relativeRiskCentral: 0.75,
      relativeRiskHigh: 0.86,
      citation: "Li L et al. JAMA 2024;331(10):850-860. doi:10.1001/jama.2024.0851",
      url: "https://pubmed.ncbi.nlm.nih.gov/38470385/",
    },
  ],
  createdAt: "2026-10-28T18:39:06.808Z",
  updatedAt: "2026-10-28T18:42:33.245Z",
} as const satisfies CauseOfDeath
