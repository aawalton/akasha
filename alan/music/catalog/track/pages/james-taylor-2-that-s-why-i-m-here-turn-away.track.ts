import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2ThatSWhyIMHereTurnAway = {
  id: "01a0abeb-4215-7b21-ab70-9e2d8337b3d6",
  type: "page-type/track",
  slug: "james-taylor-2-that-s-why-i-m-here-turn-away",
  ownLength: 3.37,
  ownProgress: 3.37,
  partOfCollections: ["release/james-taylor-2-that-s-why-i-m-here"],
  status: "completed",
  unit: "unit/minutes",
  title: "Turn Away",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "turnaway|0vn7UBvSQECKJm2817Yf1P|202200",
  song: "song/james-taylor-turn-away",
  carriedBy: [
    {
      release: "release/james-taylor-2-that-s-why-i-m-here",
      discNumber: 1,
      position: 4,
      externalId: "1rRLh11nk5tkJ7QYLffIff",
      externalLink: "https://open.spotify.com/track/1rRLh11nk5tkJ7QYLffIff",
    },
  ],
} as const satisfies Track
