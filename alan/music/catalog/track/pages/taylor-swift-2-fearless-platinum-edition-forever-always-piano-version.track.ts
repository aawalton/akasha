import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessPlatinumEditionForeverAlwaysPianoVersion = {
  id: "01a0ce86-9169-788d-872e-7a116ae685c1",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-platinum-edition-forever-always-piano-version",
  ownLength: 4.458433333333334,
  ownProgress: 4.458433333333334,
  partOfCollections: ["release/taylor-swift-2-fearless-platinum-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Forever & Always - Piano Version",
  trackType: "version",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "foreveralwayspianoversion|06HL4z0CvFAxyc27GXpf02|267506",
  song: "song/taylor-swift-forever-always",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless-platinum-edition",
      discNumber: 1,
      position: 3,
      externalId: "46HGgtwmmuEB8mvDCyjyAc",
      externalLink: "https://open.spotify.com/track/46HGgtwmmuEB8mvDCyjyAc",
    },
  ],
} as const satisfies Track
