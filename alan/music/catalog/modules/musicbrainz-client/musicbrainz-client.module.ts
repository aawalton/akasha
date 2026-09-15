import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const musicbrainzClient = {
  id: "01a06262-ff4c-7000-b193-5ca094701486",
  type: "page-type/module",
  slug: "musicbrainz-client",
  definition: "MusicBrainz asked for an artist, the works and the recordings",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "MusicBrainz is asked no more than once every 1100 milliseconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One queue has every ask this module makes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The queue is per process.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ask that fails waits as long as an ask that answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every ask names Alan's email address in its user agent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browse takes 100 rows at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A browse ends once the count MusicBrainz gives is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer that is no 200 is thrown rather than returned.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No test here reaches MusicBrainz.",
    },
  ],
} as const satisfies Module
