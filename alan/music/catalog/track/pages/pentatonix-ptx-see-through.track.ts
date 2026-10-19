import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixPtxSeeThrough = {
  id: "01a1546f-24fd-7a62-b3f9-1f0ca960be8f",
  type: "page-type/track",
  slug: "pentatonix-ptx-see-through",
  ownLength: 3.3228833333333334,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-ptx"],
  status: "not-started",
  unit: "unit/minutes",
  title: "See Through",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "seethrough|26AHtbjWKiwYzsoGoUZq53|199373",
  song: "song/pentatonix-see-through",
  carriedBy: [
    {
      release: "release/pentatonix-ptx",
      discNumber: 1,
      position: 6,
      externalId: "2zlnzbrwXVlOdLJ2D3jxxo",
      externalLink: "https://open.spotify.com/track/2zlnzbrwXVlOdLJ2D3jxxo",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
