import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessPlatinumEditionSuperstar = {
  id: "01a0ce86-91bc-7930-8e0d-e30df06bd371",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-platinum-edition-superstar",
  ownLength: 4.35755,
  ownProgress: 4.35755,
  partOfCollections: ["release/taylor-swift-2-fearless-platinum-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "SuperStar",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "superstar|06HL4z0CvFAxyc27GXpf02|261453",
  song: "song/taylor-swift-superstar",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless-platinum-edition",
      discNumber: 1,
      position: 5,
      externalId: "14Bljc3pOOG0xQX3wqhLN9",
      externalLink: "https://open.spotify.com/track/14Bljc3pOOG0xQX3wqhLN9",
    },
  ],
} as const satisfies Track
