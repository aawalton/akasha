import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayKaleidoscopeEpAllICanThinkAboutIsYou = {
  id: "01a0b9ee-f198-7051-9a2f-94fcc37e52af",
  type: "page-type/track",
  slug: "coldplay-kaleidoscope-ep-all-i-can-think-about-is-you",
  ownLength: 4.576433333333333,
  ownProgress: 4.576433333333333,
  partOfCollections: ["release/coldplay-kaleidoscope-ep"],
  status: "completed",
  unit: "unit/minutes",
  title: "All I Can Think About Is You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "allicanthinkaboutisyou|4gzpq5DPGxSnKTe4SA8HAU|274586",
  song: "song/coldplay-all-i-can-think-about-is-you",
  carriedBy: [
    {
      release: "release/coldplay-kaleidoscope-ep",
      discNumber: 1,
      position: 1,
      externalId: "6V6goat94tTJOWXXKZstNX",
      externalLink: "https://open.spotify.com/track/6V6goat94tTJOWXXKZstNX",
    },
  ],
} as const satisfies Track
