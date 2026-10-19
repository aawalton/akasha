import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixEvergreenWonderfulChristmastime = {
  id: "01a1546f-24f8-7474-bc69-88be3f469f2d",
  type: "page-type/track",
  slug: "pentatonix-evergreen-wonderful-christmastime",
  ownLength: 2.5263,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-evergreen"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Wonderful Christmastime",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "wonderfulchristmastime|26AHtbjWKiwYzsoGoUZq53|151578",
  song: "song/pentatonix-wonderful-christmastime",
  carriedBy: [
    {
      release: "release/pentatonix-evergreen",
      discNumber: 1,
      position: 2,
      externalId: "7CxxSyJcOhLSbMLrbm2bjT",
      externalLink: "https://open.spotify.com/track/7CxxSyJcOhLSbMLrbm2bjT",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
