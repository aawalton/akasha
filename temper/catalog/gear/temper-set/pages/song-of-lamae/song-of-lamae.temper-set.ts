import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const songOfLamae = {
  id: "019e668e-9a65-7f1b-9352-4266928a57ff",
  type: "page-type/temper-set",
  slug: "song-of-lamae",
  title: "Song of Lamae",
  key: "song-of-lamae",
  esoSetId: 81,
  category: "temper-set-category/crafted",
  valid: ["*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
