import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const musicbrainzSchema = {
  id: "01a06262-ff4b-7000-b97e-0a84ff1da2bd",
  type: "page-type/module",
  slug: "musicbrainz-schema",
  definition: "the shape a MusicBrainz answer takes",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A field MusicBrainz may leave out is read as absent rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A list MusicBrainz leaves out is read as empty.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches the network.",
    },
  ],
} as const satisfies Module
