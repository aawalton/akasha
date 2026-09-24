import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverBillieBossaNova = {
  id: "01a0b638-e3ec-7c2d-ade9-877a6bbb3d97",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-billie-bossa-nova",
  ownLength: 3.2788333333333335,
  ownProgress: 3.2788333333333335,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  status: "completed",
  unit: "unit/minutes",
  title: "Billie Bossa Nova",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "billiebossanova|6qqNVTkY8uBg9cP3Jd7DAH|196730",
  song: "song/billie-eilish-billie-bossa-nova",
  carriedBy: [
    {
      release: "release/billie-eilish-happier-than-ever",
      discNumber: 1,
      position: 3,
      externalId: "2KnuaZYoGzDoHiBTNYOTXG",
      externalLink: "https://open.spotify.com/track/2KnuaZYoGzDoHiBTNYOTXG",
    },
  ],
} as const satisfies Track
