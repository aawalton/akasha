import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2MidnightsTheTilDawnEditionLavenderHaze = {
  id: "01a0ce86-9c47-7199-9187-9197308dffc7",
  type: "page-type/track",
  slug: "taylor-swift-2-midnights-the-til-dawn-edition-lavender-haze",
  ownLength: 3.37325,
  ownProgress: 3.37325,
  partOfCollections: [
    "release/taylor-swift-2-midnights-the-til-dawn-edition",
    "release/taylor-swift-2-midnights-3am-edition",
    "release/taylor-swift-2-midnights",
    "release/taylor-swift-2-lavender-haze-remixes",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Lavender Haze",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "lavenderhaze|06HL4z0CvFAxyc27GXpf02|202395",
  song: "song/taylor-swift-lavender-haze",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lavender-haze-remixes",
      discNumber: 1,
      position: 5,
      externalId: "5NlYplrGsjUDFZ6x3HeVyT",
      externalLink: "https://open.spotify.com/track/5NlYplrGsjUDFZ6x3HeVyT",
    },
    {
      release: "release/taylor-swift-2-midnights",
      discNumber: 1,
      position: 1,
      externalId: "5jQI2r1RdgtuT8S3iG8zFC",
      externalLink: "https://open.spotify.com/track/5jQI2r1RdgtuT8S3iG8zFC",
    },
    {
      release: "release/taylor-swift-2-midnights-3am-edition",
      discNumber: 1,
      position: 1,
      externalId: "4g2c7NoTWAOSYDy44l9nub",
      externalLink: "https://open.spotify.com/track/4g2c7NoTWAOSYDy44l9nub",
    },
    {
      release: "release/taylor-swift-2-midnights-the-til-dawn-edition",
      discNumber: 1,
      position: 1,
      externalId: "24emu3sabKISjRkrys28jq",
      externalLink: "https://open.spotify.com/track/24emu3sabKISjRkrys28jq",
    },
  ],
} as const satisfies Track
