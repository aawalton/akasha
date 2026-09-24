import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2NeverDieYoungNeverDieYoung = {
  id: "01a0abeb-4095-7a1a-bd48-998011621714",
  type: "page-type/track",
  slug: "james-taylor-2-never-die-young-never-die-young",
  ownLength: 4.4,
  ownProgress: 4.4,
  partOfCollections: ["release/james-taylor-2-never-die-young"],
  status: "completed",
  unit: "unit/minutes",
  title: "Never Die Young",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "neverdieyoung|0vn7UBvSQECKJm2817Yf1P|264000",
  song: "song/james-taylor-never-die-young",
  carriedBy: [
    {
      release: "release/james-taylor-2-never-die-young",
      discNumber: 1,
      position: 1,
      externalId: "0ALbTno07vq90jEOFcHCbd",
      externalLink: "https://open.spotify.com/track/0ALbTno07vq90jEOFcHCbd",
    },
  ],
} as const satisfies Track
