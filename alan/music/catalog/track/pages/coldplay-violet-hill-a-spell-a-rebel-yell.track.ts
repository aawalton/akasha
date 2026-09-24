import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayVioletHillASpellARebelYell = {
  id: "01a0b9ee-fd50-745c-8832-a2de3496bb74",
  type: "page-type/track",
  slug: "coldplay-violet-hill-a-spell-a-rebel-yell",
  ownLength: 2.8042166666666666,
  ownProgress: 2.8042166666666666,
  partOfCollections: ["release/coldplay-violet-hill"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Spell a Rebel Yell",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "aspellarebelyell|4gzpq5DPGxSnKTe4SA8HAU|168253",
  song: "song/coldplay-a-spell-a-rebel-yell",
  carriedBy: [
    {
      release: "release/coldplay-violet-hill",
      discNumber: 1,
      position: 2,
      externalId: "59Mg99pBZJFtvgSKIQTMMw",
      externalLink: "https://open.spotify.com/track/59Mg99pBZJFtvgSKIQTMMw",
    },
  ],
} as const satisfies Track
