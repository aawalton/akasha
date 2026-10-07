import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const narrationReport = {
  id: "01a113fa-3d0d-7449-b997-fe9546f82d11",
  type: "page-type/module",
  slug: "narration-report",
  definition: "what the phone's player does with a narration, told to the web server",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each event the audio element fires while it plays a narration is reported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page being hidden or shown again is reported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each thing recovery does to a narration is reported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A report says where the playhead is, how much audio is held past it, and the error.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No time update is reported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A report that fails to send is dropped and changes nothing Alan hears.",
    },
  ],
} as const satisfies Module
