import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NewMoonShineOneMoreGoRound = {
  id: "01a0abeb-4005-7faa-9c43-29267999e076",
  type: "page-type/track",
  slug: "james-taylor-2-new-moon-shine-one-more-go-round",
  ownLength: 4.680433333333333,
  ownProgress: 4.680433333333333,
  partOfCollections: ["release/james-taylor-2-new-moon-shine"],
  status: "completed",
  unit: "unit/minutes",
  title: "One More Go Round",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "onemoregoround|0vn7UBvSQECKJm2817Yf1P|280826",
  song: "song/james-taylor-one-more-go-round",
  carriedBy: [
    {
      release: "release/james-taylor-2-new-moon-shine",
      discNumber: 1,
      position: 8,
      externalId: "6XLh9yBr6Dxif6s6dkyNyi",
      externalLink: "https://open.spotify.com/track/6XLh9yBr6Dxif6s6dkyNyi",
    },
  ],
} as const satisfies Track
