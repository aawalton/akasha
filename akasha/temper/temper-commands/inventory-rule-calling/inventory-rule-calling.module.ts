import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleCalling = {
  id: "01a0680b-0616-7b70-8c7d-3bc79e3eec3b",
  pageTypeSlug: "module",
  slug: "inventory-rule-calling",
  definition: "what the commands over a temper player's inventory rules read and do alike",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The category rules, the item rules and the buy rules carry one act set.",
    },
    {
      invariantKind: "departure",
      statement: "An act every kind carries is written once here and named by each command.",
    },
    {
      invariantKind: "departure",
      statement: "What a command takes is read against the list its own page states.",
    },
    {
      invariantKind: "departure",
      statement:
        "A flag standing where the rule should be named is refused rather than read as an id.",
    },
    {
      invariantKind: "departure",
      statement: "A flag said twice is refused rather than read as the last of them.",
    },
    {
      invariantKind: "departure",
      statement: "A rule is named by its id rather than by its place in the list.",
    },
    {
      invariantKind: "departure",
      statement:
        "An id no rule of that kind carries is answered as the data rather than as the call.",
    },
    {
      invariantKind: "departure",
      statement: "A locked rule refuses the acts that change it until the call says to force them.",
    },
    {
      invariantKind: "departure",
      statement: "Locking and unlocking stand in front of no guard of their own.",
    },
    {
      invariantKind: "departure",
      statement: "A clone is inactive and unlocked whatever its source was.",
    },
    {
      invariantKind: "departure",
      statement: "A clone stands immediately after its source.",
    },
    {
      invariantKind: "departure",
      statement:
        "A category rule is shown from the written rules first and the derived ones second.",
    },
    {
      invariantKind: "departure",
      statement: "What a row says is the columns that rule kind carries.",
    },
    {
      invariantKind: "departure",
      statement: "What JSON says is the whole shape the rule carries.",
    },
    {
      invariantKind: "departure",
      statement: "A fault thrown by what this calls is answered with what it said.",
    },
    {
      invariantKind: "departure",
      statement: "A fault carrying a code of its own is answered under that code.",
    },
    {
      invariantKind: "stopgap",
      statement: "Every write here is worked out and then refused by the store it writes through.",
    },
    {
      invariantKind: "gap",
      statement: "The rule store this reads through is in akasha.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here prints.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes a controlled rule.",
    },
  ],
} as const satisfies Module
