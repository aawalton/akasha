import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FolkloreHoax = {
  id: "01a0ce86-6da7-7cb7-ae16-bf4f46e42c16",
  type: "page-type/track",
  slug: "taylor-swift-2-folklore-hoax",
  ownLength: 3.6673666666666667,
  ownProgress: 3.6673666666666667,
  partOfCollections: ["release/taylor-swift-2-folklore"],
  status: "completed",
  unit: "unit/minutes",
  title: "hoax",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "hoax|06HL4z0CvFAxyc27GXpf02|220042",
  song: "song/taylor-swift-hoax",
  carriedBy: [
    {
      release: "release/taylor-swift-2-folklore",
      discNumber: 1,
      position: 16,
      externalId: "6MWoRt97mnSTXZhu3ggi9C",
      externalLink: "https://open.spotify.com/track/6MWoRt97mnSTXZhu3ggi9C",
    },
  ],
} as const satisfies Track
