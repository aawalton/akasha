import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inboxCountWatch = {
  id: "01a079de-6d8f-7a3c-b51f-9a53ca155b81",
  type: "page-type/module",
  slug: "inbox-count-watch",
  definition: "the task, finding and gap counts kept current as pages land",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The counts are taken again whenever a page of a counted type moves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which folders hold the pages of a counted type is asked of the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One take is made when the watch opens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A take finding the same counts as the take before writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count is written onto the tracking day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count is kept beside the readout that count was taken for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count is carried to the site showing that count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A count kept beside a readout is the count that take made rather than a count read back off the day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A take arriving while a take runs is made once the running take is done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two takes never run at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A take opening is where this watch leaves for code that moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No take is running there, which is what makes a take opening a safe point.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A take left rather than made is made again by the watch that opens next.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The day written and the day counted are one ESO day settled once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A throw says its reason and ends the run rather than being passed over.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The timers taking the task counts run whatever the watch does.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here counts the mail.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here waits on a beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page folder that came after the watch opened is followed once it is there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The folder holding the finding page type is followed, so a findings folder coming back is seen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder holding the gaps picture is followed, so a gap landing is seen.",
    },
  ],
} as const satisfies Module
