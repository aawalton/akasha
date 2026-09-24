import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2ThatSWhyIMHereMona = {
  id: "01a0abeb-42ce-7026-a9c9-1f29c1676489",
  type: "page-type/track",
  slug: "james-taylor-2-that-s-why-i-m-here-mona",
  ownLength: 2.81555,
  ownProgress: 2.81555,
  partOfCollections: ["release/james-taylor-2-that-s-why-i-m-here"],
  status: "completed",
  unit: "unit/minutes",
  title: "Mona",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "mona|0vn7UBvSQECKJm2817Yf1P|168933",
  song: "song/james-taylor-mona",
  carriedBy: [
    {
      release: "release/james-taylor-2-that-s-why-i-m-here",
      discNumber: 1,
      position: 10,
      externalId: "2SQuqDBmNjSB22dFqjkSOP",
      externalLink: "https://open.spotify.com/track/2SQuqDBmNjSB22dFqjkSOP",
    },
  ],
} as const satisfies Track
