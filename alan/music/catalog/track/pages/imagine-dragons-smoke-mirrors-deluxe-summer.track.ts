import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsDeluxeSummer = {
  id: "01a0c43f-d083-7ff4-96de-321ea2aaf05e",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-deluxe-summer",
  ownLength: 3.638,
  ownProgress: 3.638,
  partOfCollections: [
    "release/imagine-dragons-smoke-mirrors-deluxe",
    "release/imagine-dragons-smoke-mirrors",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Summer",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "summer|53XhwfbYqKCa1cC15pYq2q|218280",
  song: "song/imagine-dragons-summer",
  carriedBy: [
    {
      release: "release/imagine-dragons-smoke-mirrors",
      discNumber: 1,
      position: 11,
      externalId: "0TrvmvJngRUlCaBtt8VPRs",
      externalLink: "https://open.spotify.com/track/0TrvmvJngRUlCaBtt8VPRs",
    },
    {
      release: "release/imagine-dragons-smoke-mirrors-deluxe",
      discNumber: 1,
      position: 11,
      externalId: "5dvDAORqUH5xoO8bfv0hlG",
      externalLink: "https://open.spotify.com/track/5dvDAORqUH5xoO8bfv0hlG",
    },
  ],
} as const satisfies Track
