import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sylviaDaleyMyOwnRulesMyOwnRules = {
  id: "01a0a6c3-6c15-77a4-bd8c-95fa57b7ef1e",
  type: "page-type/track",
  slug: "sylvia-daley-my-own-rules-my-own-rules",
  ownLength: 2.5697833333333335,
  ownProgress: 0,
  partOfCollections: ["release/sylvia-daley-my-own-rules"],
  status: "not-started",
  unit: "unit/minutes",
  title: "My Own Rules",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sylvia-daley" }],
  trackKey: "myownrules|03dXd2zBbBJvX60Oap8Lgo|154187",
  song: "song/sylvia-daley-my-own-rules",
  carriedBy: [
    {
      release: "release/sylvia-daley-my-own-rules",
      discNumber: 1,
      position: 1,
      externalId: "4FcR7G0OXj6sBOGHnDCWkF",
      externalLink: "https://open.spotify.com/track/4FcR7G0OXj6sBOGHnDCWkF",
    },
  ],
} as const satisfies Track
