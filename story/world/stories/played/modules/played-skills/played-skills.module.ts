import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedSkills = {
  id: "01a17ece-91bc-7526-835b-6e1bbf280509",
  type: "page-type/module",
  slug: "played-skills",
  definition:
    "the experience, governing attribute and ability kind a story played's held skill states",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A held skill's experience is the number its holding states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A held skill's attribute is named as the attributes on the sheet are named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding naming no attribute page is answered with no attribute.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A held skill's ability kind is the kind the holding names, or else the kind its world's skill names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A held skill whose kind is named nowhere is answered with no ability kind.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the store, so what is handed in is all that is read.",
    },
  ],
  createdAt: "2026-10-27T19:20:29.371Z",
  updatedAt: "2026-10-28T00:42:25.403Z",
} as const satisfies Module
