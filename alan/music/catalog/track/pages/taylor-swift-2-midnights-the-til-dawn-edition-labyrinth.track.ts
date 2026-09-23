import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2MidnightsTheTilDawnEditionLabyrinth = {
  id: "01a0ce86-5155-7bab-ab6e-e3374ba0358d",
  type: "page-type/track",
  slug: "taylor-swift-2-midnights-the-til-dawn-edition-labyrinth",
  ownLength: 4.1327,
  ownProgress: 0,
  partOfCollections: [
    "release/taylor-swift-2-midnights-the-til-dawn-edition",
    "release/taylor-swift-2-midnights-3am-edition",
    "release/taylor-swift-2-midnights",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "Labyrinth",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "labyrinth|06HL4z0CvFAxyc27GXpf02|247962",
  song: "song/taylor-swift-labyrinth",
  carriedBy: [
    {
      release: "release/taylor-swift-2-midnights",
      discNumber: 1,
      position: 10,
      externalId: "0A1JLUlkZkp2EFrosoNQi0",
      externalLink: "https://open.spotify.com/track/0A1JLUlkZkp2EFrosoNQi0",
    },
    {
      release: "release/taylor-swift-2-midnights-3am-edition",
      discNumber: 1,
      position: 10,
      externalId: "43q586vP8gGkYypKoSddhl",
      externalLink: "https://open.spotify.com/track/43q586vP8gGkYypKoSddhl",
    },
    {
      release: "release/taylor-swift-2-midnights-the-til-dawn-edition",
      discNumber: 1,
      position: 10,
      externalId: "4bBDkw2KBMX0tcgAaXC83Q",
      externalLink: "https://open.spotify.com/track/4bBDkw2KBMX0tcgAaXC83Q",
    },
  ],
} as const satisfies Track
