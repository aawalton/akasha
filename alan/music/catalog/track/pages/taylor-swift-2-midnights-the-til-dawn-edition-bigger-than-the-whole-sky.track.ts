import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2MidnightsTheTilDawnEditionBiggerThanTheWholeSky = {
  id: "01a0ce86-4f23-7d7a-85ab-010f5f8709c1",
  type: "page-type/track",
  slug: "taylor-swift-2-midnights-the-til-dawn-edition-bigger-than-the-whole-sky",
  ownLength: 3.6417,
  ownProgress: 3.6417,
  partOfCollections: [
    "release/taylor-swift-2-midnights-the-til-dawn-edition",
    "release/taylor-swift-2-midnights-3am-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Bigger Than The Whole Sky",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "biggerthanthewholesky|06HL4z0CvFAxyc27GXpf02|218502",
  song: "song/taylor-swift-bigger-than-the-whole-sky",
  carriedBy: [
    {
      release: "release/taylor-swift-2-midnights-3am-edition",
      discNumber: 1,
      position: 15,
      externalId: "0BiqmkasE5FdrChwKfVp8X",
      externalLink: "https://open.spotify.com/track/0BiqmkasE5FdrChwKfVp8X",
    },
    {
      release: "release/taylor-swift-2-midnights-the-til-dawn-edition",
      discNumber: 1,
      position: 15,
      externalId: "71CBDRKmF2VeRKYMG1DFBh",
      externalLink: "https://open.spotify.com/track/71CBDRKmF2VeRKYMG1DFBh",
    },
  ],
} as const satisfies Track
