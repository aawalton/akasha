import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const trackSyncing = {
  id: "01a0a593-09e4-757b-a4e7-c505b16e801a",
  type: "page-type/module",
  slug: "track-syncing",
  definition: "the tracks a release carries, filed as pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every track a release carries is filed as a page of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track names the release carrying it as an address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track is named for the release carrying it and its own title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track arrives started by nobody and heard for none of its length.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track states whether the provider marks it explicit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track states every artist the provider credits, in the order given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A credit names the artist page stating the Spotify id the credit is given under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A credit whose artist has no page states the name Spotify credits instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The artist pages are read once for a sweep rather than once for a track.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track states the key matching it to the same track on another release.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That key is the title, the artists and the length in milliseconds together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A recording already filed is found by an id one of its carriers states or by its key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A release carrying a recording already filed is added to the page already filed for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The page a recording is filed under is the one sorting first among those stating its key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track names every release carrying that track.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track states one carrier for every release carrying that track.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A release swept again replaces the carrier naming that release.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The progress and the grade a person gave a track outlive every sweep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A release's count of tracks filed is kept up within the run that filed them.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches Spotify.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here lands an edit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track names the song that track is a recording of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The song a track names is a song of the artist the release names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track whose song is filed nowhere has that song filed within the same run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A song filed that way is landed beside the track naming it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track under an artist who has no page names no song.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track states the kind of recording its own title says it is.",
    },
  ],
} as const satisfies Module
