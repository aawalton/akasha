import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const coverAnchoring = {
  id: "01a0fde7-482a-7bca-8405-1c84b376d53a",
  type: "page-type/module",
  slug: "cover-anchoring",
  definition: "whether a played turn drafted a new cover with the words it is drawn after",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A draft giving a played turn a new cover with no cover-after is refused when drafted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A draft leaving a turn's cover as it was is let through, whatever else it changes.",
    },
  ],
} as const satisfies Module
