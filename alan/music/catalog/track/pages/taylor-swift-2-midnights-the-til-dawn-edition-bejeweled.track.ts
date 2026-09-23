import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2MidnightsTheTilDawnEditionBejeweled = {
  id: "01a0ce86-512b-7eb5-9e07-a344882a08eb",
  type: "page-type/track",
  slug: "taylor-swift-2-midnights-the-til-dawn-edition-bejeweled",
  ownLength: 3.236083333333333,
  ownProgress: 0,
  partOfCollections: [
    "release/taylor-swift-2-midnights-the-til-dawn-edition",
    "release/taylor-swift-2-midnights-3am-edition",
    "release/taylor-swift-2-midnights",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Bejeweled",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "bejeweled|06HL4z0CvFAxyc27GXpf02|194165",
  song: "song/taylor-swift-bejeweled",
  carriedBy: [
    {
      release: "release/taylor-swift-2-midnights",
      discNumber: 1,
      position: 9,
      externalId: "3qoftcUZaUOncvIYjFSPdE",
      externalLink: "https://open.spotify.com/track/3qoftcUZaUOncvIYjFSPdE",
    },
    {
      release: "release/taylor-swift-2-midnights-3am-edition",
      discNumber: 1,
      position: 9,
      externalId: "0jvo9CjnbR0lYUDTSNTMiu",
      externalLink: "https://open.spotify.com/track/0jvo9CjnbR0lYUDTSNTMiu",
    },
    {
      release: "release/taylor-swift-2-midnights-the-til-dawn-edition",
      discNumber: 1,
      position: 9,
      externalId: "0VpF6RLdCfPIeYRwMu4tZK",
      externalLink: "https://open.spotify.com/track/0VpF6RLdCfPIeYRwMu4tZK",
    },
  ],
} as const satisfies Track
