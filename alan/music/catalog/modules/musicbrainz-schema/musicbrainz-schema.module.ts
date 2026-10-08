import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const musicbrainzSchema = {
  id: "01a06262-ff4b-7000-b97e-0a84ff1da2bd",
  type: "page-type/module",
  slug: "musicbrainz-schema",
  definition: "the shape a MusicBrainz answer takes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A field MusicBrainz may leave out is read as absent rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A list MusicBrainz leaves out is read as empty.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the network.",
    },
  ],
  createdAt: "2026-09-02T13:50:50.187Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies Module
