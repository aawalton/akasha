import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NeverDieYoungSweetPotatoPie = {
  id: "01a0abeb-4153-76e5-89ad-ec40561a3f58",
  type: "page-type/track",
  slug: "james-taylor-2-never-die-young-sweet-potato-pie",
  ownLength: 3.5137666666666667,
  ownProgress: 3.5137666666666667,
  partOfCollections: ["release/james-taylor-2-never-die-young"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sweet Potato Pie",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "sweetpotatopie|0vn7UBvSQECKJm2817Yf1P|210826",
  song: "song/james-taylor-sweet-potato-pie",
  carriedBy: [
    {
      release: "release/james-taylor-2-never-die-young",
      discNumber: 1,
      position: 7,
      externalId: "49E3znGU6pKjxpjch2oCCM",
      externalLink: "https://open.spotify.com/track/49E3znGU6pKjxpjch2oCCM",
    },
  ],
} as const satisfies Track
