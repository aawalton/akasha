import type { Module } from "@akasha/code/module"

export const lrclibMap = {
  id: "01a06262-ff4c-7005-b1fe-0f60b8c2ffbe",
  pageTypeSlug: "module",
  type: "module",
  slug: "lrclib-map",
  definition: "an LRCLIB answer read as the words a song has",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A record chosen is no instrumental.",
    },
    {
      invariantKind: "departure",
      statement: "A record chosen has words.",
    },
    {
      invariantKind: "departure",
      statement: "A record chosen has the same normalised title as the song.",
    },
    {
      invariantKind: "departure",
      statement: "A record chosen names an artist whose normalised name has the song's.",
    },
    {
      invariantKind: "departure",
      statement: "A record with words stamped line by line wins over one with plain words.",
    },
    {
      invariantKind: "departure",
      statement: "The first record LRCLIB answered wins where no record is stamped.",
    },
    {
      invariantKind: "departure",
      statement: "The words of a song are the body of a file beside the song's page.",
    },
    {
      invariantKind: "departure",
      statement: "The provider the words came from is a field of the song's page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the network.",
    },
  ],
} as const satisfies Module
