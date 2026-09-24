import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLetSomebodyGoKygoRemixLetSomebodyGoSingleVersion = {
  id: "01a0b9ee-ed4c-7528-af68-4126ae5fe000",
  type: "page-type/track",
  slug: "coldplay-let-somebody-go-kygo-remix-let-somebody-go-single-version",
  ownLength: 3.54915,
  ownProgress: 3.54915,
  partOfCollections: [
    "release/coldplay-let-somebody-go-kygo-remix",
    "release/coldplay-let-somebody-go",
    "release/coldplay-let-somebody-go-piano-version",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Let Somebody Go - Single Version",
  trackType: "version",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }, { artistName: "Selena Gomez" }],
  trackKey: "letsomebodygosingleversion|0C8ZW7ezQVs4URX5aX7Kqx,4gzpq5DPGxSnKTe4SA8HAU|212949",
  song: "song/coldplay-let-somebody-go",
  carriedBy: [
    {
      release: "release/coldplay-let-somebody-go",
      discNumber: 1,
      position: 1,
      externalId: "1d8Pn4akKfdadbavUjAGoS",
      externalLink: "https://open.spotify.com/track/1d8Pn4akKfdadbavUjAGoS",
    },
    {
      release: "release/coldplay-let-somebody-go-kygo-remix",
      discNumber: 1,
      position: 2,
      externalId: "30sT4ZOHeVcPESnIsiofQb",
      externalLink: "https://open.spotify.com/track/30sT4ZOHeVcPESnIsiofQb",
    },
    {
      release: "release/coldplay-let-somebody-go-piano-version",
      discNumber: 1,
      position: 3,
      externalId: "59GSz2S248YmyMYavpcxFI",
      externalLink: "https://open.spotify.com/track/59GSz2S248YmyMYavpcxFI",
    },
  ],
} as const satisfies Track
