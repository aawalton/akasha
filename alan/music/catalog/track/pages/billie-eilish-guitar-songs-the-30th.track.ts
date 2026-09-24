import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishGuitarSongsThe30th = {
  id: "01a0b638-e900-7fae-a57d-b87cd436be0a",
  type: "page-type/track",
  slug: "billie-eilish-guitar-songs-the-30th",
  ownLength: 3.607466666666667,
  ownProgress: 3.607466666666667,
  partOfCollections: ["release/billie-eilish-guitar-songs"],
  status: "completed",
  unit: "unit/minutes",
  title: "The 30th",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "the30th|6qqNVTkY8uBg9cP3Jd7DAH|216448",
  song: "song/billie-eilish-the-30th",
  carriedBy: [
    {
      release: "release/billie-eilish-guitar-songs",
      discNumber: 1,
      position: 2,
      externalId: "5SHpuW2qjkQtFRpE6P9Nks",
      externalLink: "https://open.spotify.com/track/5SHpuW2qjkQtFRpE6P9Nks",
    },
  ],
} as const satisfies Track
