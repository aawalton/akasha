import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyloXylotoParadise = {
  id: "01a0b9ee-dc48-7dae-bac6-c34f7d9e4bb3",
  type: "page-type/track",
  slug: "coldplay-mylo-xyloto-paradise",
  ownLength: 4.645316666666667,
  ownProgress: 4.645316666666667,
  partOfCollections: ["release/coldplay-mylo-xyloto", "release/coldplay-paradise"],
  status: "completed",
  unit: "unit/minutes",
  title: "Paradise",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "paradise|4gzpq5DPGxSnKTe4SA8HAU|278719",
  song: "song/coldplay-paradise",
  carriedBy: [
    {
      release: "release/coldplay-mylo-xyloto",
      discNumber: 1,
      position: 3,
      externalId: "6nek1Nin9q48AVZcWs9e9D",
      externalLink: "https://open.spotify.com/track/6nek1Nin9q48AVZcWs9e9D",
    },
    {
      release: "release/coldplay-paradise",
      discNumber: 1,
      position: 1,
      externalId: "5egJWXdr8HapODmxnRdn54",
      externalLink: "https://open.spotify.com/track/5egJWXdr8HapODmxnRdn54",
    },
  ],
} as const satisfies Track
