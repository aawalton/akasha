import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const catalogueHeld = {
  id: "01a09c06-fd09-7448-ae50-64aed341cbb5",
  type: "page-type/module",
  slug: "catalogue-held",
  definition: "the artists and songs already filed, read by what musicbrainz calls each",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An artist is found by the musicbrainz id on that artist's record.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An artist nothing here holds is named for the name musicbrainz gave.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A song is keyed by the musicbrainz id on that song's record.",
    },

    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches the network or writes a page.",
    },
  ],
} as const satisfies Module
