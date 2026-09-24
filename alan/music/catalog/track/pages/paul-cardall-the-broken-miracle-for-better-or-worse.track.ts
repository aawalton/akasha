import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleForBetterOrWorse = {
  id: "01a0b4c8-2ff1-7a70-b69f-5016659eae4c",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-for-better-or-worse",
  ownLength: 2.6626666666666665,
  ownProgress: 2.6626666666666665,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  status: "completed",
  unit: "unit/minutes",
  title: "For Better or Worse",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "forbetterorworse|7FQRbf8gbKw8KZQZAJWxH2|159760",
  song: "song/paul-cardall-for-better-or-worse",
  carriedBy: [
    {
      release: "release/paul-cardall-the-broken-miracle",
      discNumber: 1,
      position: 10,
      externalId: "1pgILP7O7CjVOtzs26TNkP",
      externalLink: "https://open.spotify.com/track/1pgILP7O7CjVOtzs26TNkP",
    },
  ],
} as const satisfies Track
