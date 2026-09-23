import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2ReputationThisIsWhyWeCantHaveNiceThings = {
  id: "01a0ce86-748d-717f-9cec-d289a9be545b",
  type: "page-type/track",
  slug: "taylor-swift-2-reputation-this-is-why-we-cant-have-nice-things",
  ownLength: 3.4522166666666667,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-reputation"],
  status: "not-started",
  unit: "unit/minutes",
  title: "This Is Why We Can't Have Nice Things",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "thisiswhywecanthavenicethings|06HL4z0CvFAxyc27GXpf02|207133",
  song: "song/taylor-swift-this-is-why-we-can-t-have-nice-things",
  carriedBy: [
    {
      release: "release/taylor-swift-2-reputation",
      discNumber: 1,
      position: 13,
      externalId: "07NxDD1iKCHbAldceD7QLP",
      externalLink: "https://open.spotify.com/track/07NxDD1iKCHbAldceD7QLP",
    },
  ],
} as const satisfies Track
