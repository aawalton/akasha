import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const typeGenerating = {
  id: "01a087a6-ed6a-7836-81f3-764344e58378",
  type: "page-type/module",
  slug: "type-generating",
  definition: "the edits a change generator's written bodies make against the change",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A type file is written by a machine rather than composed by an agent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change generator hands its bodies here rather than diffing them itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file already with the body that would be written again is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body written here is handed to the formatter rather than left for a landing to reformat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body equal to what is already there is left out before the formatter is asked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every body the formatter is asked about goes in one run rather than one run each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file that is not there yet is answered as an addition rather than a replacement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type is reached through the shadow of the change being judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change no shadow can be laid over has nothing written.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a file.",
    },
  ],
} as const satisfies Module
