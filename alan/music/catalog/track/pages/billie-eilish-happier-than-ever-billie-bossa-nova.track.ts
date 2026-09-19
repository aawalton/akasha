import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverBillieBossaNova = {
  id: "01a0b638-e3ec-7c2d-ade9-877a6bbb3d97",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-billie-bossa-nova",
  ownLength: 3.2788333333333335,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2KnuaZYoGzDoHiBTNYOTXG",
      externalLink: "https://open.spotify.com/track/2KnuaZYoGzDoHiBTNYOTXG",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Billie Bossa Nova",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "billiebossanova|6qqNVTkY8uBg9cP3Jd7DAH|196730",
  song: "song/billie-eilish-billie-bossa-nova",
} as const satisfies Track
