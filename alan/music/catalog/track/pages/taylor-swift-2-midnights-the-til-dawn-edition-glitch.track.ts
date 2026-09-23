import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2MidnightsTheTilDawnEditionGlitch = {
  id: "01a0ce86-4fa2-70f1-9874-58272adefdcc",
  type: "page-type/track",
  slug: "taylor-swift-2-midnights-the-til-dawn-edition-glitch",
  ownLength: 2.4796833333333335,
  ownProgress: 2.4796833333333335,
  partOfCollections: [
    "release/taylor-swift-2-midnights-the-til-dawn-edition",
    "release/taylor-swift-2-midnights-3am-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Glitch",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "glitch|06HL4z0CvFAxyc27GXpf02|148781",
  song: "song/taylor-swift-glitch",
  carriedBy: [
    {
      release: "release/taylor-swift-2-midnights-3am-edition",
      discNumber: 1,
      position: 18,
      externalId: "6wAFvJPpTZVirBKGZ4EnMW",
      externalLink: "https://open.spotify.com/track/6wAFvJPpTZVirBKGZ4EnMW",
    },
    {
      release: "release/taylor-swift-2-midnights-the-til-dawn-edition",
      discNumber: 1,
      position: 18,
      externalId: "7C0w28EsX0Um2FrZs9gso2",
      externalLink: "https://open.spotify.com/track/7C0w28EsX0Um2FrZs9gso2",
    },
  ],
} as const satisfies Track
