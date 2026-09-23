import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2MidnightsTheTilDawnEditionKarmaFeatIceSpice = {
  id: "01a0ce86-4ce0-7a7a-8b82-59bbb50de0d4",
  type: "page-type/track",
  slug: "taylor-swift-2-midnights-the-til-dawn-edition-karma-feat-ice-spice",
  ownLength: 3.358216666666667,
  ownProgress: 3.358216666666667,
  partOfCollections: ["release/taylor-swift-2-midnights-the-til-dawn-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Karma (feat. Ice Spice)",
  trackType: "studio",
  explicit: true,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "3LZZPxNDGDFVSIPqf4JuEf", artistName: "Ice Spice" },
  ],
  trackKey: "karmafeaticespice|06HL4z0CvFAxyc27GXpf02,3LZZPxNDGDFVSIPqf4JuEf|201493",
  song: "song/taylor-swift-karma",
  carriedBy: [
    {
      release: "release/taylor-swift-2-midnights-the-til-dawn-edition",
      discNumber: 1,
      position: 23,
      externalId: "4i6cwNY6oIUU2XZxPIw82Y",
      externalLink: "https://open.spotify.com/track/4i6cwNY6oIUU2XZxPIw82Y",
    },
  ],
} as const satisfies Track
