import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayKaleidoscopeEpALIENS = {
  id: "01a0b9ee-f1e9-7357-9f95-0ca83961d3e9",
  type: "page-type/track",
  slug: "coldplay-kaleidoscope-ep-a-l-i-e-n-s",
  ownLength: 4.7071,
  ownProgress: 4.7071,
  partOfCollections: ["release/coldplay-kaleidoscope-ep"],
  status: "completed",
  unit: "unit/minutes",
  title: "A L I E N S",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "aliens|4gzpq5DPGxSnKTe4SA8HAU|282426",
  song: "song/coldplay-a-l-i-e-n-s",
  carriedBy: [
    {
      release: "release/coldplay-kaleidoscope-ep",
      discNumber: 1,
      position: 3,
      externalId: "2bS2ADg123NZWfTUsjra8a",
      externalLink: "https://open.spotify.com/track/2bS2ADg123NZWfTUsjra8a",
    },
  ],
} as const satisfies Track
