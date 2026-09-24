import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsDeluxeHopelessOpus = {
  id: "01a0c43f-d0a8-7a81-917d-a328a80a1920",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-deluxe-hopeless-opus",
  ownLength: 3.98,
  ownProgress: 3.98,
  partOfCollections: [
    "release/imagine-dragons-smoke-mirrors-deluxe",
    "release/imagine-dragons-smoke-mirrors",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Hopeless Opus",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "hopelessopus|53XhwfbYqKCa1cC15pYq2q|238800",
  song: "song/imagine-dragons-hopeless-opus",
  carriedBy: [
    {
      release: "release/imagine-dragons-smoke-mirrors",
      discNumber: 1,
      position: 12,
      externalId: "46dszOgLrnBSqbo6Vkc91Q",
      externalLink: "https://open.spotify.com/track/46dszOgLrnBSqbo6Vkc91Q",
    },
    {
      release: "release/imagine-dragons-smoke-mirrors-deluxe",
      discNumber: 1,
      position: 12,
      externalId: "5ygTySvimUjWJk9WLgMDCn",
      externalLink: "https://open.spotify.com/track/5ygTySvimUjWJk9WLgMDCn",
    },
  ],
} as const satisfies Track
