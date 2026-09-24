import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NewMoonShineOhBrother = {
  id: "01a0abeb-405a-7cee-aa7e-83e3bd559655",
  type: "page-type/track",
  slug: "james-taylor-2-new-moon-shine-oh-brother",
  ownLength: 4.387333333333333,
  ownProgress: 4.387333333333333,
  partOfCollections: ["release/james-taylor-2-new-moon-shine"],
  status: "completed",
  unit: "unit/minutes",
  title: "Oh Brother",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "ohbrother|0vn7UBvSQECKJm2817Yf1P|263240",
  song: "song/james-taylor-oh-brother",
  carriedBy: [
    {
      release: "release/james-taylor-2-new-moon-shine",
      discNumber: 1,
      position: 11,
      externalId: "3JzFww5xW3CDGAN6JbELbI",
      externalLink: "https://open.spotify.com/track/3JzFww5xW3CDGAN6JbELbI",
    },
  ],
} as const satisfies Track
