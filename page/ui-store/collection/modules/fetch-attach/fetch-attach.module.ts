import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fetchAttach = {
  id: "01a05b69-453f-78b8-a67b-fe573df190bf",
  type: "page-type/module",
  slug: "fetch-attach",
  test: "ts",
  definition: "the rows of a file-backed page type read into the store over HTTP",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape is read on attaching, and on a timer only while no stream follows it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A shape never yet read is read again within seconds, whether or not a stream follows it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The wait before each such read doubles, up to the timer's own wait.",
    },
  ],
} as const satisfies Module
