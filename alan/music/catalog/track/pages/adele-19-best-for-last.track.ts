import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const adele19BestForLast = {
  id: "01a0d52b-c259-7e1b-b770-3c95345c4a62",
  type: "page-type/track",
  slug: "adele-19-best-for-last",
  ownLength: 4.308433333333333,
  ownProgress: 0,
  partOfCollections: ["release/adele-19"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Best for Last",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/adele" }],
  trackKey: "bestforlast|4dpARuHxo51G3z768sgnrY|258506",
  song: "song/adele-best-for-last",
  carriedBy: [
    {
      release: "release/adele-19",
      discNumber: 1,
      position: 2,
      externalId: "6R3jZOdowU5PKFlLTcQogn",
      externalLink: "https://open.spotify.com/track/6R3jZOdowU5PKFlLTcQogn",
    },
  ],
} as const satisfies Track
