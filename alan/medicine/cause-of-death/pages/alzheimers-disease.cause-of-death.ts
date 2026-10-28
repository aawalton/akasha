import type { CauseOfDeath } from "akasha/alan/medicine/cause-of-death/cause-of-death.page-type.types.ts"

export const alzheimersDisease = {
  id: "01a183d0-491c-7ecf-bd87-ceb5bef25efc",
  type: "page-type/cause-of-death",
  slug: "alzheimers-disease",
  icd10Codes: ["G30"],
  baselineRates: [
    {
      ageBandStart: 45,
      ageBandEnd: 49,
      deathsPerHundredThousand: 0.11,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 50,
      ageBandEnd: 54,
      deathsPerHundredThousand: 0.34,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 55,
      ageBandEnd: 59,
      deathsPerHundredThousand: 1.41,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 60,
      ageBandEnd: 64,
      deathsPerHundredThousand: 4.58,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 65,
      ageBandEnd: 69,
      deathsPerHundredThousand: 12.33,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 70,
      ageBandEnd: 74,
      deathsPerHundredThousand: 36.19,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 75,
      ageBandEnd: 79,
      deathsPerHundredThousand: 98.48,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 80,
      ageBandEnd: 84,
      deathsPerHundredThousand: 266.44,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
    {
      ageBandStart: 85,
      ageBandEnd: 120,
      deathsPerHundredThousand: 788.15,
      citation:
        "CDC NCHS, National Vital Statistics System, Mortality 2018-2024 on CDC WONDER (D158), US males, 2024, accessed 2026-10-28.",
      url: "https://wonder.cdc.gov/ucd-icd10-expanded.html",
    },
  ],
  riskFactors: [
    {
      factor: "sauna 2 to 3 times a week, dementia",
      personProperty: "sauna-sessions-per-week",
      appliedAs: "2 to 3 sauna sessions a week vs 1, incident dementia, Finnish men",
      relativeRiskLow: 0.57,
      relativeRiskCentral: 0.78,
      relativeRiskHigh: 1.06,
      citation:
        "Laukkanen T, Kunutsor S, Kauhanen J, Laukkanen JA. Sauna bathing is inversely associated with dementia and Alzheimer's disease in middle-aged Finnish men. Age Ageing 2017;46(2):245-249. doi:10.1093/ageing/afw212",
      url: "https://pubmed.ncbi.nlm.nih.gov/27932366/",
    },
    {
      factor: "sauna 4 to 7 times a week, dementia",
      personProperty: "sauna-sessions-per-week",
      appliedAs: "4 to 7 sauna sessions a week vs 1, incident dementia, Finnish men",
      relativeRiskLow: 0.16,
      relativeRiskCentral: 0.34,
      relativeRiskHigh: 0.71,
      citation:
        "Laukkanen T, Kunutsor S, Kauhanen J, Laukkanen JA. Sauna bathing is inversely associated with dementia and Alzheimer's disease in middle-aged Finnish men. Age Ageing 2017;46(2):245-249. doi:10.1093/ageing/afw212",
      url: "https://pubmed.ncbi.nlm.nih.gov/27932366/",
    },
  ],
  createdAt: "2026-10-28T18:40:27.931Z",
  updatedAt: "2026-10-28T20:11:45.142Z",
} as const satisfies CauseOfDeath
