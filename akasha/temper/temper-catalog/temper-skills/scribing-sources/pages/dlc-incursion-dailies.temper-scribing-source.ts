import type { TemperScribingSource } from "../temper-scribing-source.page-type.ts"

export const dlcIncursionDailies = {
  id: "01a05fce-295a-7833-bd7f-4abc5710996e",
  pageTypeSlug: "temper-scribing-source",
  slug: "dlc-incursion-dailies",
  title: "DLC Incursion Dailies",
  displayOrder: 2,
  scriptType: "affix",
  tierAchievements: "jsonl",
  zoneSlugs: [
    "solstice",
    "west-weald",
    "telvanni-peninsula",
    "high-isle",
    "galen",
    "the-deadlands",
    "blackwood",
    "western-skyrim",
    "the-reach",
    "northern-elsweyr",
    "southern-elsweyr",
    "summerset",
  ],
} as const satisfies TemperScribingSource
