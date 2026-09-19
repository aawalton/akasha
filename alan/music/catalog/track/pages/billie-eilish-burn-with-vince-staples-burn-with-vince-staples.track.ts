import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishBurnWithVinceStaplesBurnWithVinceStaples = {
  id: "01a0b638-ecab-73aa-8a39-05d2fc13d13c",
  type: "page-type/track",
  slug: "billie-eilish-burn-with-vince-staples-burn-with-vince-staples",
  ownLength: 2.9835833333333333,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-burn-with-vince-staples"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7uX3gufAoBVqKVoD3dBLLD",
      externalLink: "https://open.spotify.com/track/7uX3gufAoBVqKVoD3dBLLD",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "&burn (with Vince Staples)",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" },
    { externalId: "68kEuyFKyqrdQQLLsmiatm", artistName: "Vince Staples" },
  ],
  trackKey: "burnwithvincestaples|68kEuyFKyqrdQQLLsmiatm,6qqNVTkY8uBg9cP3Jd7DAH|179015",
  song: "song/billie-eilish-burn",
} as const satisfies Track
