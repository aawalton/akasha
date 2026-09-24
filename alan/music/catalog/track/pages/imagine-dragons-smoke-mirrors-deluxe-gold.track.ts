import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsDeluxeGold = {
  id: "01a0c43f-cf27-7be0-b7a4-cc21c2b01d13",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-deluxe-gold",
  ownLength: 3.61355,
  ownProgress: 3.61355,
  partOfCollections: [
    "release/imagine-dragons-smoke-mirrors-deluxe",
    "release/imagine-dragons-smoke-mirrors",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Gold",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "gold|53XhwfbYqKCa1cC15pYq2q|216813",
  song: "song/imagine-dragons-gold",
  carriedBy: [
    {
      release: "release/imagine-dragons-smoke-mirrors",
      discNumber: 1,
      position: 2,
      externalId: "1WQFOwtI6EfsvRz7wcDbQm",
      externalLink: "https://open.spotify.com/track/1WQFOwtI6EfsvRz7wcDbQm",
    },
    {
      release: "release/imagine-dragons-smoke-mirrors-deluxe",
      discNumber: 1,
      position: 2,
      externalId: "3pgDkYNYH7hMCl5Njib24j",
      externalLink: "https://open.spotify.com/track/3pgDkYNYH7hMCl5Njib24j",
    },
  ],
} as const satisfies Track
