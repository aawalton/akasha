import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2MidnightsTheTilDawnEditionTheGreatWar = {
  id: "01a0ce86-4efc-7bdf-8602-69b1434ee233",
  type: "page-type/track",
  slug: "taylor-swift-2-midnights-the-til-dawn-edition-the-great-war",
  ownLength: 4.005916666666667,
  ownProgress: 4.005916666666667,
  partOfCollections: [
    "release/taylor-swift-2-midnights-the-til-dawn-edition",
    "release/taylor-swift-2-midnights-3am-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "The Great War",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "thegreatwar|06HL4z0CvFAxyc27GXpf02|240355",
  song: "song/taylor-swift-the-great-war",
  carriedBy: [
    {
      release: "release/taylor-swift-2-midnights-3am-edition",
      discNumber: 1,
      position: 14,
      externalId: "3UMrglJeju5yWyYIW6o99b",
      externalLink: "https://open.spotify.com/track/3UMrglJeju5yWyYIW6o99b",
    },
    {
      release: "release/taylor-swift-2-midnights-the-til-dawn-edition",
      discNumber: 1,
      position: 14,
      externalId: "2VuqMjgoKaOHNM8HpxtXKx",
      externalLink: "https://open.spotify.com/track/2VuqMjgoKaOHNM8HpxtXKx",
    },
  ],
} as const satisfies Track
