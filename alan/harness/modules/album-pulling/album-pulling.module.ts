import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const albumPulling = {
  id: "01a06585-5f39-70a6-bafc-9a2c3771bb19",
  type: "page-type/module",
  slug: "album-pulling",
  definition: "the CloudKit calls an iCloud shared album is read by, and where each photo goes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here makes a request.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An album is reached by a public token rather than by an account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request is built without the request being made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page of results is asked for by the rank the last page ended at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A photo whose name repeats an earlier name is numbered rather than overwritten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name that decodes to nothing usable becomes the record name and a heic ending.",
    },
  ],
} as const satisfies Module
