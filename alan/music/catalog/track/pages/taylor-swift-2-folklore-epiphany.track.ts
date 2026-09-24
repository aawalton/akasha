import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FolkloreEpiphany = {
  id: "01a0ce86-6d26-7907-85fb-d77368446830",
  type: "page-type/track",
  slug: "taylor-swift-2-folklore-epiphany",
  ownLength: 4.82915,
  ownProgress: 4.82915,
  partOfCollections: ["release/taylor-swift-2-folklore"],
  status: "completed",
  unit: "unit/minutes",
  title: "epiphany",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "epiphany|06HL4z0CvFAxyc27GXpf02|289749",
  song: "song/taylor-swift-epiphany",
  carriedBy: [
    {
      release: "release/taylor-swift-2-folklore",
      discNumber: 1,
      position: 13,
      externalId: "08fa9LFcFBTcilB3iq2e2A",
      externalLink: "https://open.spotify.com/track/08fa9LFcFBTcilB3iq2e2A",
    },
  ],
} as const satisfies Track
