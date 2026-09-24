import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayCharlieBrownDaveAudeRemixCharlieBrownDaveAudeRemix = {
  id: "01a0b9ee-f91e-7ff3-8a6f-8485af7c336d",
  type: "page-type/track",
  slug: "coldplay-charlie-brown-dave-aude-remix-charlie-brown-dave-aude-remix",
  ownLength: 6.7307,
  ownProgress: 6.7307,
  partOfCollections: ["release/coldplay-charlie-brown-dave-aude-remix"],
  status: "completed",
  unit: "unit/minutes",
  title: "Charlie Brown - Dave Audé Remix",
  trackType: "remix",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }, { artistName: "Dave Audé" }],
  trackKey: "charliebrowndaveauderemix|1vWImodgVqIgTUkekGEfR9,4gzpq5DPGxSnKTe4SA8HAU|403842",
  song: "song/coldplay-charlie-brown",
  carriedBy: [
    {
      release: "release/coldplay-charlie-brown-dave-aude-remix",
      discNumber: 1,
      position: 1,
      externalId: "1CrVfs67axZhcTa4ZxCk6M",
      externalLink: "https://open.spotify.com/track/1CrVfs67axZhcTa4ZxCk6M",
    },
  ],
} as const satisfies Track
