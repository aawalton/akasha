import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lrclibMap = {
  id: "01a06262-ff4c-7005-b1fe-0f60b8c2ffbe",
  type: "page-type/module",
  slug: "lrclib-map",
  definition: "an LRCLIB answer taken as the words a song has",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A record chosen is no instrumental.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record chosen has words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record chosen has the same normalised title as the song.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record chosen names an artist whose normalised name has the song's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record with words stamped line by line wins over a record with plain words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first record LRCLIB answered wins where no record is stamped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words of a song are the body of a file beside the song's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The provider the words came from is a field of the song's page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the network.",
    },
  ],
} as const satisfies Module
