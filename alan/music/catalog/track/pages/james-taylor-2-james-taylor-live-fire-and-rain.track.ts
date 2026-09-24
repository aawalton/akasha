import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveFireAndRain = {
  id: "01a0abeb-3d09-7d59-b7e8-1de71e89d4c9",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-fire-and-rain",
  ownLength: 4.554433333333333,
  ownProgress: 4.554433333333333,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Fire and Rain",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "fireandrain|0vn7UBvSQECKJm2817Yf1P|273266",
  song: "song/james-taylor-fire-and-rain",
  carriedBy: [
    {
      release: "release/james-taylor-2-james-taylor-live",
      discNumber: 1,
      position: 12,
      externalId: "1viOJBA51fN3goL3mJuSg8",
      externalLink: "https://open.spotify.com/track/1viOJBA51fN3goL3mJuSg8",
    },
  ],
} as const satisfies Track
