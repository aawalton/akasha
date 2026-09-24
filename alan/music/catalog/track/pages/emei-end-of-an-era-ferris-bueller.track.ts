import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiEndOfAnEraFerrisBueller = {
  id: "01a0c43e-7c69-7f15-b4a9-f15914153f3d",
  type: "page-type/track",
  slug: "emei-end-of-an-era-ferris-bueller",
  ownLength: 1.954,
  ownProgress: 1.954,
  partOfCollections: ["release/emei-end-of-an-era"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ferris Bueller",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "ferrisbueller|7E2aQQjErJocovYFjYLzWU|117240",
  song: "song/emei-ferris-bueller",
  carriedBy: [
    {
      release: "release/emei-end-of-an-era",
      discNumber: 1,
      position: 2,
      externalId: "14YzvOvrATzkS7f5sJOw2k",
      externalLink: "https://open.spotify.com/track/14YzvOvrATzkS7f5sJOw2k",
    },
  ],
} as const satisfies Track
