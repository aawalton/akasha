import type { Readout } from "../../readout.page-type.ts"

export const upkeepSafety = {
  id: "01a05f42-92f5-7004-9179-75f0f75b02e9",
  pageTypeSlug: "readout",
  slug: "upkeep-safety",
  definition: "how safe the place Alan is in",
  code: "ts",
  test: "ts",
  label: "Safety",
  unit: "levels",
  place: 1,
  scaleSlug: "safety-level",
  groupSlugs: ["upkeep", "safety"],
  wireKey: "safety",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The level now is the one the open tracking session carries.",
    },
    {
      invariantKind: "departure",
      statement: "The level a day carries is the last level that day's sessions carry.",
    },
    {
      invariantKind: "departure",
      statement: "A session carrying no level is passed over rather than read as the day's level.",
    },
    {
      invariantKind: "departure",
      statement: "A day no session carries a level on is no reading rather than a level of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A level moves in half steps.",
    },
    {
      invariantKind: "departure",
      statement: "A level below zero is a level.",
    },
    {
      invariantKind: "departure",
      statement: "A level stated as text is read as the number that level spells.",
    },
    {
      invariantKind: "departure",
      statement: "No open session is no reading rather than a level of zero.",
    },
    {
      invariantKind: "departure",
      statement: "An open session carrying no level is no reading rather than a level of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A store that refuses is a fault rather than a reading of nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here caches a reading or decides when a reading is taken.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here turns a level into a color.",
    },
  ],
} as const satisfies Readout
