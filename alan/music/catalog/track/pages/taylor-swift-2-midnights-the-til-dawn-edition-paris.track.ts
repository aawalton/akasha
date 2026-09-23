import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2MidnightsTheTilDawnEditionParis = {
  id: "01a0ce86-4f4c-7920-802c-ce7b991b141e",
  type: "page-type/track",
  slug: "taylor-swift-2-midnights-the-til-dawn-edition-paris",
  ownLength: 3.270966666666667,
  ownProgress: 0,
  partOfCollections: [
    "release/taylor-swift-2-midnights-the-til-dawn-edition",
    "release/taylor-swift-2-midnights-3am-edition",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Paris",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "paris|06HL4z0CvFAxyc27GXpf02|196258",
  song: "song/taylor-swift-paris",
  carriedBy: [
    {
      release: "release/taylor-swift-2-midnights-3am-edition",
      discNumber: 1,
      position: 16,
      externalId: "7712gjoih4QoDbXpljEk21",
      externalLink: "https://open.spotify.com/track/7712gjoih4QoDbXpljEk21",
    },
    {
      release: "release/taylor-swift-2-midnights-the-til-dawn-edition",
      discNumber: 1,
      position: 16,
      externalId: "5tWxKWq1DSP1s9WQ5PWuqu",
      externalLink: "https://open.spotify.com/track/5tWxKWq1DSP1s9WQ5PWuqu",
    },
  ],
} as const satisfies Track
