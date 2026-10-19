import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixChristmasIsHereSweaterWeather = {
  id: "01a1546f-24f6-799f-b6cc-f1d8ac0a9439",
  type: "page-type/track",
  slug: "pentatonix-christmas-is-here-sweater-weather",
  ownLength: 3.3768,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-christmas-is-here"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Sweater Weather",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "sweaterweather|26AHtbjWKiwYzsoGoUZq53|202608",
  song: "song/pentatonix-sweater-weather",
  carriedBy: [
    {
      release: "release/pentatonix-christmas-is-here",
      discNumber: 1,
      position: 6,
      externalId: "50YYe94G19kWVyhzdEXxki",
      externalLink: "https://open.spotify.com/track/50YYe94G19kWVyhzdEXxki",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
