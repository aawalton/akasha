import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const catalogueHeld = {
  id: "01a09c06-fd09-7448-ae50-64aed341cbb5",
  type: "module",
  slug: "catalogue-held",
  definition: "the artists and songs already filed, read by what musicbrainz calls each",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An artist is found by the musicbrainz id on that artist's record.",
    },
    {
      invariantKind: "departure",
      statement: "An artist stating no such record is found by the flat id that artist states.",
    },
    {
      invariantKind: "departure",
      statement: "A flat id another provider gave finds no artist.",
    },
    {
      invariantKind: "departure",
      statement: "An artist nothing here holds is named for the name musicbrainz gave.",
    },
    {
      invariantKind: "departure",
      statement: "A song is keyed by the musicbrainz id on that song's record.",
    },
    {
      invariantKind: "departure",
      statement: "The flat keys a page holds are dropped before that page is stated again.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the network or writes a page.",
    },
  ],
} as const satisfies Module
