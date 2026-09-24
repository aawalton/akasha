import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const gameMechanicRun = {
  id: "01a0c951-6739-72ed-a7e2-63f36a4d5cbe",
  type: "page-type/page-type",
  slug: "game-mechanic-run",
  definition: "one run of a mechanic a game settled a turn by, and what that run answered",
  pluralSlug: "mechanic-runs",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/holding-game", required: true, many: false },
    { pageProperty: "number-property/source-turn", required: false, many: false },
    { pageProperty: "relation-property/run-mechanic", required: false, many: false },
    { pageProperty: "text-property/run-said", required: false, many: false },
    { pageProperty: "text-property/run-seed", required: false, many: false },
    { pageProperty: "text-property/run-follows", required: false, many: false },
    { pageProperty: "file-property/run-workings", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A run belongs to one game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run names the mechanic that ran rather than the rules that were in force.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run holds what the mechanic was handed, so running it again answers the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run has the hash of the run before it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seed is settled before the roll that seed is asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run carried over from an older shape has no run before it to follow.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run carried over from an older shape may name no turn.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No run holds a copy of the rules, the commit holding those.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  parts: [
    "relation-property/run-mechanic",
    "text-property/run-said",
    "text-property/run-seed",
    "text-property/run-follows",
    "file-property/run-workings",
    "module/run-paging",
  ],
} as const satisfies PageType
