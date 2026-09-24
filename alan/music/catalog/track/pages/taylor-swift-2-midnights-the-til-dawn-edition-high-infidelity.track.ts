import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2MidnightsTheTilDawnEditionHighInfidelity = {
  id: "01a0ce86-4f75-7b44-8b37-f6c3c80058e1",
  type: "page-type/track",
  slug: "taylor-swift-2-midnights-the-til-dawn-edition-high-infidelity",
  ownLength: 3.8579166666666667,
  ownProgress: 3.8579166666666667,
  partOfCollections: [
    "release/taylor-swift-2-midnights-the-til-dawn-edition",
    "release/taylor-swift-2-midnights-3am-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "High Infidelity",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "highinfidelity|06HL4z0CvFAxyc27GXpf02|231475",
  song: "song/taylor-swift-high-infidelity",
  carriedBy: [
    {
      release: "release/taylor-swift-2-midnights-3am-edition",
      discNumber: 1,
      position: 17,
      externalId: "5kiZGSxgqPdv6rbqL9THdd",
      externalLink: "https://open.spotify.com/track/5kiZGSxgqPdv6rbqL9THdd",
    },
    {
      release: "release/taylor-swift-2-midnights-the-til-dawn-edition",
      discNumber: 1,
      position: 17,
      externalId: "1SztNGCwEHJEVFx90E5g7D",
      externalLink: "https://open.spotify.com/track/1SztNGCwEHJEVFx90E5g7D",
    },
  ],
} as const satisfies Track
