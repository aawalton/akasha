import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift21989BadBlood = {
  id: "01a0ce86-7f37-7557-9321-d6b82a0be116",
  type: "page-type/track",
  slug: "taylor-swift-2-1989-bad-blood",
  ownLength: 3.532216666666667,
  ownProgress: 3.532216666666667,
  partOfCollections: ["release/taylor-swift-2-1989", "release/taylor-swift-2-1989-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bad Blood",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "badblood|06HL4z0CvFAxyc27GXpf02|211933",
  song: "song/taylor-swift-bad-blood",
  carriedBy: [
    {
      release: "release/taylor-swift-2-1989",
      discNumber: 1,
      position: 8,
      externalId: "273dCMFseLcVsoSWx59IoE",
      externalLink: "https://open.spotify.com/track/273dCMFseLcVsoSWx59IoE",
    },
    {
      release: "release/taylor-swift-2-1989-deluxe-edition",
      discNumber: 1,
      position: 8,
      externalId: "0yN4fNzmVnmgC0dsOoi9Wh",
      externalLink: "https://open.spotify.com/track/0yN4fNzmVnmgC0dsOoi9Wh",
    },
  ],
} as const satisfies Track
