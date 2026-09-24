import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishBurnWithVinceStaplesBurnWithVinceStaples = {
  id: "01a0b638-ecab-73aa-8a39-05d2fc13d13c",
  type: "page-type/track",
  slug: "billie-eilish-burn-with-vince-staples-burn-with-vince-staples",
  ownLength: 2.9835833333333333,
  ownProgress: 2.9835833333333333,
  partOfCollections: [
    "release/billie-eilish-burn-with-vince-staples",
    "release/billie-eilish-dont-smile-at-me",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "&burn (with Vince Staples)",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }, { artistName: "Vince Staples" }],
  trackKey: "burnwithvincestaples|68kEuyFKyqrdQQLLsmiatm,6qqNVTkY8uBg9cP3Jd7DAH|179015",
  song: "song/billie-eilish-burn",
  carriedBy: [
    {
      release: "release/billie-eilish-burn-with-vince-staples",
      discNumber: 1,
      position: 1,
      externalId: "7uX3gufAoBVqKVoD3dBLLD",
      externalLink: "https://open.spotify.com/track/7uX3gufAoBVqKVoD3dBLLD",
    },
    {
      release: "release/billie-eilish-dont-smile-at-me",
      discNumber: 1,
      position: 9,
      externalId: "6X7qcg95CAeJpTjtg1wooM",
      externalLink: "https://open.spotify.com/track/6X7qcg95CAeJpTjtg1wooM",
    },
  ],
} as const satisfies Track
