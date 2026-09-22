import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const changeWalking = {
  id: "01a0583c-9b26-78cf-972c-3801c6b1ad94",
  type: "page-type/module",
  slug: "change-walking",
  definition: "how a check reaches the text it judges",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here loads a check.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A selector says the input a check takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The names spared in the code beside a page are read off the page type stating them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body read as code is named `.ts` or `.tsx`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body taken as a stylesheet is named `.css`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check judging both reaches code and stylesheets through one selector.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A selector takes as input every path the selector hands over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether a change holds the input a check takes is answered here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A runner carrying an input is run only over a change holding a path it takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A selector names a path before reading it, so a path it drops is never opened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A selector over texts is told the index the change leaves as well as the path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A selector over pages and their entry files takes both as input.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check judging a path the change takes away walks the change itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body that is there and will not open refuses the check reading that body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal for a body that will not open names the path that body is at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path nothing sits at is taken as nothing rather than as unreadable.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path a folder sits at is taken as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder has no body a check judges.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body is opened rather than looked for and then opened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body that is not text refuses the check reading that body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal for a body that is not text names the path that body is at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check refusing a body that is not text reads that body through this module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check reading a body leniently reaches `body-text` rather than this module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change held over a run reads each path once and answers from that read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path taken away after that read is answered with the body that read got.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body that will not open refuses the run rather than being held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A selector over bodies is told the index the change leaves as well as the path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A selector hands each body over as it is read rather than reading every body first.",
    },
  ],
} as const satisfies Module
