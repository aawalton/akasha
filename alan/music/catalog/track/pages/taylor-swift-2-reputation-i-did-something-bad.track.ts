import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2ReputationIDidSomethingBad = {
  id: "01a0ce86-7317-73a4-ad6c-4b463ab16da4",
  type: "page-type/track",
  slug: "taylor-swift-2-reputation-i-did-something-bad",
  ownLength: 3.9708833333333335,
  ownProgress: 3.9708833333333335,
  partOfCollections: ["release/taylor-swift-2-reputation"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Did Something Bad",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "ididsomethingbad|06HL4z0CvFAxyc27GXpf02|238253",
  song: "song/taylor-swift-i-did-something-bad",
  carriedBy: [
    {
      release: "release/taylor-swift-2-reputation",
      discNumber: 1,
      position: 3,
      externalId: "4svZDCRz4cJoneBpjpx8DJ",
      externalLink: "https://open.spotify.com/track/4svZDCRz4cJoneBpjpx8DJ",
    },
  ],
} as const satisfies Track
