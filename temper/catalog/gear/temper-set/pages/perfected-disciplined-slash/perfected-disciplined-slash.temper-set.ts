import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const perfectedDisciplinedSlash = {
  id: "019e66ec-7c7f-787f-86da-557a9ec99bf3",
  type: "page-type/temper-set",
  slug: "perfected-disciplined-slash",
  title: "Perfected Disciplined Slash",
  key: "perfected-disciplined-slash",
  esoSetId: 357,
  category: "temper-set-category/trial",
  valid: ["greatsword", "battleaxe", "maul"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
