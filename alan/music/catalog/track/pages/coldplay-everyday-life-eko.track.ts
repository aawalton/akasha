import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayEverydayLifeEko = {
  id: "01a0b9ee-d060-7fb3-9752-9ddd9099937a",
  type: "page-type/track",
  slug: "coldplay-everyday-life-eko",
  ownLength: 2.6311,
  ownProgress: 2.6311,
  partOfCollections: ["release/coldplay-everyday-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "Èkó",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "eko|4gzpq5DPGxSnKTe4SA8HAU|157866",
  song: "song/coldplay-eko",
  carriedBy: [
    {
      release: "release/coldplay-everyday-life",
      discNumber: 2,
      position: 3,
      externalId: "2HUtNS9qtfgWbnaagK6AAe",
      externalLink: "https://open.spotify.com/track/2HUtNS9qtfgWbnaagK6AAe",
    },
  ],
} as const satisfies Track
