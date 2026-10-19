import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixStarsStars = {
  id: "01a1546f-24fe-7878-b827-c446db13e7be",
  type: "page-type/track",
  slug: "pentatonix-stars-stars",
  ownLength: 3.0577666666666667,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-stars"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Stars",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "stars|26AHtbjWKiwYzsoGoUZq53|183466",
  song: "song/pentatonix-stars",
  carriedBy: [
    {
      release: "release/pentatonix-stars",
      discNumber: 1,
      position: 1,
      externalId: "4247FwxHfmtIJgILhAKjaa",
      externalLink: "https://open.spotify.com/track/4247FwxHfmtIJgILhAKjaa",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
