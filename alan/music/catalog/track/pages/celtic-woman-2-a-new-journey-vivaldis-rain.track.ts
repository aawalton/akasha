import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2ANewJourneyVivaldisRain = {
  id: "01a0abea-75b7-755f-a9ab-0e4baffc20f0",
  type: "page-type/track",
  slug: "celtic-woman-2-a-new-journey-vivaldis-rain",
  ownLength: 2.187333333333333,
  ownProgress: 2.187333333333333,
  partOfCollections: ["release/celtic-woman-2-a-new-journey"],
  status: "completed",
  unit: "unit/minutes",
  title: "Vivaldi's Rain",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "vivaldisrain|6NWtt9pNOL2Gx7kBykdE5x|131240",
  song: "song/celtic-woman-vivaldis-rain",
  carriedBy: [
    {
      release: "release/celtic-woman-2-a-new-journey",
      discNumber: 1,
      position: 13,
      externalId: "5IYKgT6BN80PTlA07bMbOy",
      externalLink: "https://open.spotify.com/track/5IYKgT6BN80PTlA07bMbOy",
    },
  ],
} as const satisfies Track
