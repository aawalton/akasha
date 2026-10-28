import type { CauseOfDeath } from "akasha/alan/medicine/cause-of-death/cause-of-death.page-type.types.ts"

export const motorVehicleCrash = {
  id: "01a183cf-0c3c-7f82-912f-8e8de80b78f7",
  type: "page-type/cause-of-death",
  slug: "motor-vehicle-crash",
  icd10Codes: [
    "V02-V04",
    "V09.0",
    "V09.2",
    "V12-V14",
    "V19.0-V19.2",
    "V19.4-V19.6",
    "V20-V79",
    "V80.3-V80.5",
    "V81.0-V81.1",
    "V82.0-V82.1",
    "V83-V86",
    "V87.0-V87.8",
    "V88.0-V88.8",
    "V89.0",
    "V89.2",
  ],
  baselineRates: [
    {
      ageBandStart: 40,
      ageBandEnd: 44,
      deathsPerHundredThousand: 20.91,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 45,
      ageBandEnd: 49,
      deathsPerHundredThousand: 19.23,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 50,
      ageBandEnd: 54,
      deathsPerHundredThousand: 20.33,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 55,
      ageBandEnd: 59,
      deathsPerHundredThousand: 21.81,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 60,
      ageBandEnd: 64,
      deathsPerHundredThousand: 21.96,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 65,
      ageBandEnd: 69,
      deathsPerHundredThousand: 21.13,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 70,
      ageBandEnd: 74,
      deathsPerHundredThousand: 19.01,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 75,
      ageBandEnd: 79,
      deathsPerHundredThousand: 23.38,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 80,
      ageBandEnd: 84,
      deathsPerHundredThousand: 29,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 85,
      ageBandEnd: 120,
      deathsPerHundredThousand: 37.74,
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
