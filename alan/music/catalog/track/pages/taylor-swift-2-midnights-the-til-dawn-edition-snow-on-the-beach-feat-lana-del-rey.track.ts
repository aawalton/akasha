import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2MidnightsTheTilDawnEditionSnowOnTheBeachFeatLanaDelRey = {
  id: "01a0ce86-506b-7fd5-997c-9c98a30e19a0",
  type: "page-type/track",
  slug: "taylor-swift-2-midnights-the-til-dawn-edition-snow-on-the-beach-feat-lana-del-rey",
  ownLength: 4.2687333333333335,
  ownProgress: 4.2687333333333335,
  partOfCollections: [
    "release/taylor-swift-2-midnights-the-til-dawn-edition",
    "release/taylor-swift-2-midnights-3am-edition",
    "release/taylor-swift-2-midnights",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Snow On The Beach (feat. Lana Del Rey)",
  trackType: "studio",
  explicit: true,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "00FQb4jTyendYWaN8pK0wa", artistName: "Lana Del Rey" },
  ],
  trackKey: "snowonthebeachfeatlanadelrey|00FQb4jTyendYWaN8pK0wa,06HL4z0CvFAxyc27GXpf02|256124",
  song: "song/taylor-swift-snow-on-the-beach",
  carriedBy: [
    {
      release: "release/taylor-swift-2-midnights",
      discNumber: 1,
      position: 4,
      externalId: "1wtOxkiel43cVs0Yux5Q4h",
      externalLink: "https://open.spotify.com/track/1wtOxkiel43cVs0Yux5Q4h",
    },
    {
      release: "release/taylor-swift-2-midnights-3am-edition",
      discNumber: 1,
      position: 4,
      externalId: "6ADDIJxxqzM9LMpm78yzQG",
      externalLink: "https://open.spotify.com/track/6ADDIJxxqzM9LMpm78yzQG",
    },
    {
      release: "release/taylor-swift-2-midnights-the-til-dawn-edition",
      discNumber: 1,
      position: 4,
      externalId: "7GA86Uo2jYbj8vIXe2nyWd",
      externalLink: "https://open.spotify.com/track/7GA86Uo2jYbj8vIXe2nyWd",
    },
  ],
} as const satisfies Track
