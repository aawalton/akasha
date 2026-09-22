import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const alert = {
  id: "01a06755-0778-7804-96f1-949fc3c68e4f",
  type: "page-type/page-type",
  slug: "alert",
  definition: "a condition on the system somebody is told about",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "alert" },
    { partOfSpeech: "part-of-speech/noun", spelling: "alerts" },
  ],
  extends: ["page-type/page"],
  parts: [],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "standard-agent-english-property/definition", required: true, many: false },
    { pageProperty: "relation-property/person", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An alert says the condition rather than the rule that raised the alert.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule the deployment has raises an alert.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An alert names the area answering for the alert or the person answering for the alert.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recovery arrives as its own alert.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A firing site sends no message.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "An alert that fires is acted on or repaired.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "No rule this repository deploys raises any alert here.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "Every alert reaches the person or area answering for the condition the alert names.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A firing site names its condition and nothing about who is told.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A firing site records `alert.condition.fired` or `alert.condition.cleared`.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "An alert event has its condition slug in `reference_id`.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "An alert is matched from the event stream by the condition the alert names.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
