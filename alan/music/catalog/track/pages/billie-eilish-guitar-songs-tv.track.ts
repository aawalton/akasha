import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishGuitarSongsTv = {
  id: "01a0b638-e8d6-71ff-a192-b9579af30556",
  type: "page-type/track",
  slug: "billie-eilish-guitar-songs-tv",
  ownLength: 4.689666666666667,
  ownProgress: 4.689666666666667,
  partOfCollections: ["release/billie-eilish-guitar-songs"],
  status: "completed",
  unit: "unit/minutes",
  title: "TV",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "tv|6qqNVTkY8uBg9cP3Jd7DAH|281380",
  song: "song/billie-eilish-tv",
  carriedBy: [
    {
      release: "release/billie-eilish-guitar-songs",
      discNumber: 1,
      position: 1,
      externalId: "3GYlZ7tbxLOxe6ewMNVTkw",
      externalLink: "https://open.spotify.com/track/3GYlZ7tbxLOxe6ewMNVTkw",
    },
  ],
} as const satisfies Track
