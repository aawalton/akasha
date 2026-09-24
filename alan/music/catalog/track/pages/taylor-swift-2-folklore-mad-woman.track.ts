import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FolkloreMadWoman = {
  id: "01a0ce86-6cfd-7428-ad1b-343e0a03070a",
  type: "page-type/track",
  slug: "taylor-swift-2-folklore-mad-woman",
  ownLength: 3.9543,
  ownProgress: 3.9543,
  partOfCollections: ["release/taylor-swift-2-folklore"],
  status: "completed",
  unit: "unit/minutes",
  title: "mad woman",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "madwoman|06HL4z0CvFAxyc27GXpf02|237258",
  song: "song/taylor-swift-mad-woman",
  carriedBy: [
    {
      release: "release/taylor-swift-2-folklore",
      discNumber: 1,
      position: 12,
      externalId: "2QDyYdZyhlP2fp79KZX8Bi",
      externalLink: "https://open.spotify.com/track/2QDyYdZyhlP2fp79KZX8Bi",
    },
  ],
} as const satisfies Track
