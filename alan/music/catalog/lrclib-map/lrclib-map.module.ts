import type { Module } from "@akasha/code-system/module"

export const lrclibMap = {
  id: "01a06262-ff4c-7005-b1fe-0f60b8c2ffbe",
  pageTypeSlug: "module",
  slug: "lrclib-map",
  definition: "an LRCLIB answer read as the words a song carries",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A record chosen is no instrumental.",
    },
    {
      invariantKind: "departure",
      statement: "A record chosen holds words.",
    },
    {
      invariantKind: "departure",
      statement: "A record chosen carries the same normalised title as the song.",
    },
    {
      invariantKind: "departure",
      statement: "A record chosen names an artist whose normalised name holds the song's.",
    },
    {
      invariantKind: "departure",
      statement: "A record carrying words stamped line by line wins over one carrying plain words.",
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
