import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FolkloreMirrorball = {
  id: "01a0ce86-6bfd-71ce-b12e-4059e1e2daa1",
  type: "page-type/track",
  slug: "taylor-swift-2-folklore-mirrorball",
  ownLength: 3.48295,
  ownProgress: 3.48295,
  partOfCollections: ["release/taylor-swift-2-folklore"],
  status: "completed",
  unit: "unit/minutes",
  title: "mirrorball",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "mirrorball|06HL4z0CvFAxyc27GXpf02|208977",
  song: "song/taylor-swift-mirrorball",
  carriedBy: [
    {
      release: "release/taylor-swift-2-folklore",
      discNumber: 1,
      position: 6,
      externalId: "0ZNU020wNYvgW84iljPkPP",
      externalLink: "https://open.spotify.com/track/0ZNU020wNYvgW84iljPkPP",
    },
  ],
} as const satisfies Track
