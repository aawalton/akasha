import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2MidnightsTheTilDawnEditionWouldveCouldveShouldve = {
  id: "01a0ce86-4fc3-753b-8f5d-a740aa822c01",
  type: "page-type/track",
  slug: "taylor-swift-2-midnights-the-til-dawn-edition-wouldve-couldve-shouldve",
  ownLength: 4.33935,
  ownProgress: 4.33935,
  partOfCollections: [
    "release/taylor-swift-2-midnights-the-til-dawn-edition",
    "release/taylor-swift-2-midnights-3am-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Would've, Could've, Should've",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "wouldvecouldveshouldve|06HL4z0CvFAxyc27GXpf02|260361",
  song: "song/taylor-swift-would-ve-could-ve-should-ve",
  carriedBy: [
    {
      release: "release/taylor-swift-2-midnights-3am-edition",
      discNumber: 1,
      position: 19,
      externalId: "0aV5uARAknQgYhBaK944FP",
      externalLink: "https://open.spotify.com/track/0aV5uARAknQgYhBaK944FP",
    },
    {
      release: "release/taylor-swift-2-midnights-the-til-dawn-edition",
      discNumber: 1,
      position: 19,
      externalId: "4txojlesMFQZGWxwz2EeqB",
      externalLink: "https://open.spotify.com/track/4txojlesMFQZGWxwz2EeqB",
    },
  ],
} as const satisfies Track
