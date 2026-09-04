import type { Module } from "@akasha/code-system/module"

export const musicbrainzSchema = {
  id: "01a06262-ff4b-7000-b97e-0a84ff1da2bd",
  pageTypeSlug: "module",
  slug: "musicbrainz-schema",
  definition: "the shape a MusicBrainz answer takes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A field MusicBrainz may leave out is read as absent rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A list MusicBrainz leaves out is read as empty.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the network.",
    },
  ],
} as const satisfies Module
