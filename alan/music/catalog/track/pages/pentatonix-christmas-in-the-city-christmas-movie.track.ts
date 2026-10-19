import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixChristmasInTheCityChristmasMovie = {
  id: "01a1546f-24f5-7806-b15a-f5de98b2ab50",
  type: "page-type/track",
  slug: "pentatonix-christmas-in-the-city-christmas-movie",
  ownLength: 3.077383333333333,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-christmas-in-the-city"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Christmas Movie",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "christmasmovie|26AHtbjWKiwYzsoGoUZq53|184643",
  song: "song/pentatonix-christmas-movie",
  carriedBy: [
    {
      release: "release/pentatonix-christmas-in-the-city",
      discNumber: 1,
      position: 7,
      externalId: "0xcrSDpmBnqa0QgZCWmZO3",
      externalLink: "https://open.spotify.com/track/0xcrSDpmBnqa0QgZCWmZO3",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
