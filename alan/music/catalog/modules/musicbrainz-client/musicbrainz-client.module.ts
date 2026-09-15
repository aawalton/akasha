import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const musicbrainzClient = {
  id: "01a06262-ff4c-7000-b193-5ca094701486",
  type: "module",
  slug: "musicbrainz-client",
  definition: "MusicBrainz asked for an artist, the works and the recordings",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "MusicBrainz is asked no more than once every 1100 milliseconds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One queue has every ask this module makes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The queue is per process.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An ask that fails waits as long as an ask that answers.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every ask names Alan's email address in its user agent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A browse takes 100 rows at a time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A browse ends once the count MusicBrainz gives is reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An answer that is no 200 is thrown rather than returned.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No test here reaches MusicBrainz.",
    },
  ],
} as const satisfies Module
