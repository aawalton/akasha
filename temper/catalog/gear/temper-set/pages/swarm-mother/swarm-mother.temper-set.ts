import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const swarmMother = {
  id: "019e6484-601c-71ec-9044-25babff6b440",
  type: "page-type/temper-set",
  slug: "swarm-mother",
  title: "Swarm Mother",
  key: "swarm-mother",
  esoSetId: 267,
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
