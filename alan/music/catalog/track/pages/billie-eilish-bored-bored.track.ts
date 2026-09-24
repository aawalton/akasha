import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishBoredBored = {
  id: "01a0b638-ecf9-7b29-81de-324795003bf8",
  type: "page-type/track",
  slug: "billie-eilish-bored-bored",
  ownLength: 3.01555,
  ownProgress: 3.01555,
  partOfCollections: ["release/billie-eilish-bored"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bored",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "bored|6qqNVTkY8uBg9cP3Jd7DAH|180933",
  song: "song/billie-eilish-bored",
  carriedBy: [
    {
      release: "release/billie-eilish-bored",
      discNumber: 1,
      position: 1,
      externalId: "04sN26COy28wTXYj3dMoiZ",
      externalLink: "https://open.spotify.com/track/04sN26COy28wTXYj3dMoiZ",
    },
  ],
} as const satisfies Track
