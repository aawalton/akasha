import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2MidnightsTheTilDawnEditionMaroon = {
  id: "01a0ce86-5025-7d84-a776-623ec73507cf",
  type: "page-type/track",
  slug: "taylor-swift-2-midnights-the-til-dawn-edition-maroon",
  ownLength: 3.6378333333333335,
  ownProgress: 3.6378333333333335,
  partOfCollections: [
    "release/taylor-swift-2-midnights-the-til-dawn-edition",
    "release/taylor-swift-2-midnights-3am-edition",
    "release/taylor-swift-2-midnights",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Maroon",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "maroon|06HL4z0CvFAxyc27GXpf02|218270",
  song: "song/taylor-swift-maroon",
  carriedBy: [
    {
      release: "release/taylor-swift-2-midnights",
      discNumber: 1,
      position: 2,
      externalId: "3eX0NZfLtGzoLUxPNvRfqm",
      externalLink: "https://open.spotify.com/track/3eX0NZfLtGzoLUxPNvRfqm",
    },
    {
      release: "release/taylor-swift-2-midnights-3am-edition",
      discNumber: 1,
      position: 2,
      externalId: "199E1RRrVmVTQqBXih5qRC",
      externalLink: "https://open.spotify.com/track/199E1RRrVmVTQqBXih5qRC",
    },
    {
      release: "release/taylor-swift-2-midnights-the-til-dawn-edition",
      discNumber: 1,
      position: 2,
      externalId: "6qxvy9Pe4RJIq5JBVbbwbS",
      externalLink: "https://open.spotify.com/track/6qxvy9Pe4RJIq5JBVbbwbS",
    },
  ],
} as const satisfies Track
