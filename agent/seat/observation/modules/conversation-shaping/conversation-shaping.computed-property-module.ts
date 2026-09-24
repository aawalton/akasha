import type { ComputedPropertyModule } from "akasha/page/computed-property-module/computed-property-module.page-type.types.ts"

export const conversationShaping = {
  id: "01a0d430-41e2-7f5f-8d4b-4cbbcd9ae52c",
  type: "page-type/computed-property-module",
  slug: "conversation-shaping",
  definition:
    "a seat's transcript since its last compaction, shaped as the lines a reader is shown",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tool call's subject is the one `tool-subject` names, as the editor names it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transcript is read from its last compaction, found reading back from its end.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A compaction ending clears every entry before it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The summary a compaction wrote is no entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the harness wrote in the person's place is no entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prompt queued while a turn ran is an entry of the person's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tool call is one line naming the tool and the tool's subject.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No tool's result is carried.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No thinking is carried.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's end is a line saying how long the turn worked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An image the person attached is counted rather than carried.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry carries the time its record was written, where the record states one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The clock time a reader is shown is worked out where the reader is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line that does not parse is no entry.",
    },
  ],
} as const satisfies ComputedPropertyModule
