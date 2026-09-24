import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedDeluxeEditionComeBackBeHere = {
  id: "01a0ce86-867d-719c-8aa6-4f7f4557155f",
  type: "page-type/track",
  slug: "taylor-swift-2-red-deluxe-edition-come-back-be-here",
  ownLength: 3.7117666666666667,
  ownProgress: 3.7117666666666667,
  partOfCollections: ["release/taylor-swift-2-red-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Come Back...Be Here",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "comebackbehere|06HL4z0CvFAxyc27GXpf02|222706",
  song: "song/taylor-swift-come-back-be-here",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red-deluxe-edition",
      discNumber: 1,
      position: 18,
      externalId: "4qyalTRMRH5YuEntvvMvq0",
      externalLink: "https://open.spotify.com/track/4qyalTRMRH5YuEntvvMvq0",
    },
  ],
} as const satisfies Track
