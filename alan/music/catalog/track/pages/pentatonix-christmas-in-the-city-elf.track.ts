import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixChristmasInTheCityElf = {
  id: "01a1546f-24f5-7e7a-81b8-96d5e1bd43c8",
  type: "page-type/track",
  slug: "pentatonix-christmas-in-the-city-elf",
  ownLength: 2.8662833333333335,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-christmas-in-the-city"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Elf",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "elf|26AHtbjWKiwYzsoGoUZq53|171977",
  song: "song/pentatonix-elf",
  carriedBy: [
    {
      release: "release/pentatonix-christmas-in-the-city",
      discNumber: 1,
      position: 14,
      externalId: "088HuIp16Xq5o4q6PiwbVR",
      externalLink: "https://open.spotify.com/track/088HuIp16Xq5o4q6PiwbVR",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
