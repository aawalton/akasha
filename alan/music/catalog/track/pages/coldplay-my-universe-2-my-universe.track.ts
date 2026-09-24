import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyUniverse2MyUniverse = {
  id: "01a0b9ee-ef1c-7b17-8630-bb331b89fff1",
  type: "page-type/track",
  slug: "coldplay-my-universe-2-my-universe",
  ownLength: 3.8,
  ownProgress: 3.8,
  partOfCollections: ["release/coldplay-my-universe-2", "release/coldplay-my-universe"],
  status: "completed",
  unit: "unit/minutes",
  title: "My Universe",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }, { artistName: "BTS" }],
  trackKey: "myuniverse|3Nrfpe0tUJi4K4DXYWgMUX,4gzpq5DPGxSnKTe4SA8HAU|228000",
  song: "song/coldplay-my-universe",
  carriedBy: [
    {
      release: "release/coldplay-my-universe",
      discNumber: 1,
      position: 3,
      externalId: "7btzRuXC6Ed3rIyomBRkO2",
      externalLink: "https://open.spotify.com/track/7btzRuXC6Ed3rIyomBRkO2",
    },
    {
      release: "release/coldplay-my-universe-2",
      discNumber: 1,
      position: 1,
      externalId: "3FeVmId7tL5YN8B7R3imoM",
      externalLink: "https://open.spotify.com/track/3FeVmId7tL5YN8B7R3imoM",
    },
  ],
} as const satisfies Track
