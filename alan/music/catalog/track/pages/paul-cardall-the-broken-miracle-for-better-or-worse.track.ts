import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleForBetterOrWorse = {
  id: "01a0b4c8-2ff1-7a70-b69f-5016659eae4c",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-for-better-or-worse",
  ownLength: 2.6626666666666665,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1pgILP7O7CjVOtzs26TNkP",
      externalLink: "https://open.spotify.com/track/1pgILP7O7CjVOtzs26TNkP",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "For Better or Worse",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "forbetterorworse|7FQRbf8gbKw8KZQZAJWxH2|159760",
  song: "song/paul-cardall-for-better-or-worse",
} as const satisfies Track
