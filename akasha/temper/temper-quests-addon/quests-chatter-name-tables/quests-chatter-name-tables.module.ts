import type { Module } from "@akasha/code-system/module"

export const questsChatterNameTables = {
  id: "01a0635f-391c-79f3-87e1-6c303b4a5402",
  pageTypeSlug: "module",
  slug: "quests-chatter-name-tables",
  definition: "the names the game gives its dialogue option codes and its interaction codes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each name is read from the globals one at a time.",
    },
    {
      invariantKind: "absence",
      statement: "The globals are never enumerated as a whole.",
    },
    {
      invariantKind: "constraint",
      statement: "Enumerating the globals taints the call stack against protected functions.",
    },
    {
      invariantKind: "departure",
      statement: "These names are worked out from the game's own enumerations.",
    },
  ],
} as const satisfies Module
