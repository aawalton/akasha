import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const phoebeBridgersPunisherKyoto = {
  id: "01a13fd9-71f8-7911-8d51-1bec585be823",
  type: "page-type/track",
  slug: "phoebe-bridgers-punisher-kyoto",
  ownLength: 3.0754,
  ownProgress: 0,
  partOfCollections: ["release/phoebe-bridgers-punisher", "release/phoebe-bridgers-i-see-you"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Kyoto",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/phoebe-bridgers" }],
  trackKey: "kyoto|1r1uxoy19fzMxunt3ONAkG|184524",
  song: "song/phoebe-bridgers-kyoto",
  carriedBy: [
    {
      release: "release/phoebe-bridgers-i-see-you",
      discNumber: 1,
      position: 2,
      externalId: "2hwOneDCq3l1FCRpxbtgic",
      externalLink: "https://open.spotify.com/track/2hwOneDCq3l1FCRpxbtgic",
    },
    {
      release: "release/phoebe-bridgers-punisher",
      discNumber: 1,
      position: 3,
      externalId: "4vjvx7Zxkb4AltGcZ0BBvI",
      externalLink: "https://open.spotify.com/track/4vjvx7Zxkb4AltGcZ0BBvI",
    },
  ],
  createdAt: "2026-10-15T13:56:17.521Z",
  updatedAt: "2026-10-15T13:56:17.521Z",
} as const satisfies Track
