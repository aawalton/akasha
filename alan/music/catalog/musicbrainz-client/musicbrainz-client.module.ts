import type { Module } from "@akasha/code-system/module"

export const musicbrainzClient = {
  id: "01a06262-ff4c-7000-b193-5ca094701486",
  pageTypeSlug: "module",
  slug: "musicbrainz-client",
  definition: "MusicBrainz asked for an artist, the works and the recordings",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "MusicBrainz is asked no more than once every 1100 milliseconds.",
    },
    {
      invariantKind: "departure",
      statement: "One queue holds every ask this module makes.",
    },
    {
      invariantKind: "departure",
      statement: "The queue is per process.",
    },
    {
      invariantKind: "departure",
      statement: "An ask that fails waits as long as one that answers.",
    },
    {
      invariantKind: "departure",
      statement: "Every ask names Alan's email address in its user agent.",
    },
    {
      invariantKind: "departure",
      statement: "A browse takes 100 rows at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A browse ends once the count MusicBrainz gives is reached.",
    },
    {
      invariantKind: "departure",
      statement: "An answer that is no 200 is thrown rather than returned.",
    },
    {
      invariantKind: "absence",
      statement: "No test here reaches MusicBrainz.",
    },
  ],
} as const satisfies Module
