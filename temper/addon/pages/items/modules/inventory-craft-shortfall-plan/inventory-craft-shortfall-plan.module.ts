import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryCraftShortfallPlan = {
  id: "01a0d4a7-fd95-712e-997a-e1cf26ec6a80",
  type: "page-type/module",
  slug: "inventory-craft-shortfall-plan",
  definition: "how much a stocking rule crafts to fill its shortfall, and whether a character may",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The target is the by-priority leg's quantity times the characters that leg takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each leg after the by-priority leg adds its quantity, and a leg with none adds 0.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chain with no by-priority leg has no target, so nothing is crafted for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The current character and the bank are counted live, and nothing saved counts them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other character and every house storage is counted as last saved.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A guild bank, the craft bag, a companion or a placed furnishing counts toward nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The crafts made are the shortfall over one craft's yield, rounded up to a whole craft.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The crafts made never pass what the materials on hand allow.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first passive short of the rank it needs is the one a refusal names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A craft makes a rule's items where the rule's category is the craft's or above it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A craft makes a rule's items where the rule's category sits under the craft's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A station is served by the one resolver naming its craft, and by nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Of several ways to craft, the one whose materials cost least per craft is chosen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A way with any material unpriced ranks after every way with all its materials priced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "With no way priced, the first found is crafted and said to be unpriced.",
    },
  ],
} as const satisfies Module
