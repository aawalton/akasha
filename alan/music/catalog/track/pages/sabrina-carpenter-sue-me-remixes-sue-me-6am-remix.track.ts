import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSueMeRemixesSueMe6amRemix = {
  id: "01a0b111-3075-79da-9e07-8de74c15fc0b",
  type: "page-type/track",
  slug: "sabrina-carpenter-sue-me-remixes-sue-me-6am-remix",
  ownLength: 2.8916666666666666,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-sue-me-remixes"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4vjhSnvgxQPPg1G3ekSTBZ",
      externalLink: "https://open.spotify.com/track/4vjhSnvgxQPPg1G3ekSTBZ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Sue Me - 6am Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
    { externalId: "0bUZrFj7rstq07E4iAJHgZ", artistName: "KC Lights" },
  ],
  trackKey: "sueme6amremix|0bUZrFj7rstq07E4iAJHgZ,74KM79TiuVKeVCqs8QtB0B|173500",
  song: "song/sabrina-carpenter-sue-me",
} as const satisfies Track
