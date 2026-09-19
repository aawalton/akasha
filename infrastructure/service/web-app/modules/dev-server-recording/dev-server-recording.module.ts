import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const devServerRecording = {
  id: "01a06583-0030-7005-bc8d-acc88730da21",
  type: "page-type/module",
  slug: "dev-server-recording",
  definition: "one dev server said as a row, running or stopped",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A dev server with no state file is a row saying stopped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value nobody knows is written as a hyphen in a row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether a dev server runs is given by the caller rather than asked here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row says the first twelve characters of the commit rather than the whole hash.",
    },
  ],
} as const satisfies Module
