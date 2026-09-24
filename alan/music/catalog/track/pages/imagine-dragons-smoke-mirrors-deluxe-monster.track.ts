import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsDeluxeMonster = {
  id: "01a0c43f-d1e7-7b93-a981-dee991fae9f6",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-deluxe-monster",
  ownLength: 4.158216666666666,
  ownProgress: 4.158216666666666,
  partOfCollections: ["release/imagine-dragons-smoke-mirrors-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "Monster",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "monster|53XhwfbYqKCa1cC15pYq2q|249493",
  song: "song/imagine-dragons-monster",
  carriedBy: [
    {
      release: "release/imagine-dragons-smoke-mirrors-deluxe",
      discNumber: 1,
      position: 20,
      externalId: "2Xaw1RrXP3mdooKWysuRJ8",
      externalLink: "https://open.spotify.com/track/2Xaw1RrXP3mdooKWysuRJ8",
    },
  ],
} as const satisfies Track
