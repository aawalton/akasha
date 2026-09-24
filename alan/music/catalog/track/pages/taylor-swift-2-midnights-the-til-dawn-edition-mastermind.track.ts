import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2MidnightsTheTilDawnEditionMastermind = {
  id: "01a0ce86-51bd-71ac-80fd-dcda377b6ec8",
  type: "page-type/track",
  slug: "taylor-swift-2-midnights-the-til-dawn-edition-mastermind",
  ownLength: 3.1839833333333334,
  ownProgress: 3.1839833333333334,
  partOfCollections: [
    "release/taylor-swift-2-midnights-the-til-dawn-edition",
    "release/taylor-swift-2-midnights-3am-edition",
    "release/taylor-swift-2-midnights",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Mastermind",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "mastermind|06HL4z0CvFAxyc27GXpf02|191039",
  song: "song/taylor-swift-mastermind",
  carriedBy: [
    {
      release: "release/taylor-swift-2-midnights",
      discNumber: 1,
      position: 13,
      externalId: "7FmYn9e7KHMXcxqGSj9LjH",
      externalLink: "https://open.spotify.com/track/7FmYn9e7KHMXcxqGSj9LjH",
    },
    {
      release: "release/taylor-swift-2-midnights-3am-edition",
      discNumber: 1,
      position: 13,
      externalId: "56hioFjQ0DXrdn04hZcFgG",
      externalLink: "https://open.spotify.com/track/56hioFjQ0DXrdn04hZcFgG",
    },
    {
      release: "release/taylor-swift-2-midnights-the-til-dawn-edition",
      discNumber: 1,
      position: 13,
      externalId: "1QQii3pa5m8MEda0nbkjfw",
      externalLink: "https://open.spotify.com/track/1QQii3pa5m8MEda0nbkjfw",
    },
  ],
} as const satisfies Track
