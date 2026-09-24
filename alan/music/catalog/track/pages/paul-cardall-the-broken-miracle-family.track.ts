import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleFamily = {
  id: "01a0b4c8-2f16-7c23-a5af-e3d937787a5d",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-family",
  ownLength: 2.2637666666666667,
  ownProgress: 2.2637666666666667,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  status: "completed",
  unit: "unit/minutes",
  title: "Family",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "family|7FQRbf8gbKw8KZQZAJWxH2|135826",
  song: "song/paul-cardall-family",
  carriedBy: [
    {
      release: "release/paul-cardall-the-broken-miracle",
      discNumber: 1,
      position: 4,
      externalId: "1S6aYw1vn3LV0jpoBpjnXv",
      externalLink: "https://open.spotify.com/track/1S6aYw1vn3LV0jpoBpjnXv",
    },
  ],
} as const satisfies Track
