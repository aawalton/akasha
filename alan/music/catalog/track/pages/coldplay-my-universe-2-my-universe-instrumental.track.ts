import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyUniverse2MyUniverseInstrumental = {
  id: "01a0b9ee-ef3e-70e7-a296-b7713ba0667c",
  type: "page-type/track",
  slug: "coldplay-my-universe-2-my-universe-instrumental",
  ownLength: 3.8,
  ownProgress: 3.8,
  partOfCollections: ["release/coldplay-my-universe-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "My Universe - Instrumental",
  trackType: "instrumental",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }, { artistName: "BTS" }],
  trackKey: "myuniverseinstrumental|3Nrfpe0tUJi4K4DXYWgMUX,4gzpq5DPGxSnKTe4SA8HAU|228000",
  song: "song/coldplay-my-universe",
  carriedBy: [
    {
      release: "release/coldplay-my-universe-2",
      discNumber: 1,
      position: 2,
      externalId: "2sp32rIevQhpbo0Z4aQzoe",
      externalLink: "https://open.spotify.com/track/2sp32rIevQhpbo0Z4aQzoe",
    },
  ],
} as const satisfies Track
