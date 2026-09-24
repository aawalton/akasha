import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emBeiholdGroundhogDayGroundhogDay = {
  id: "01a0d3ab-b898-7b93-9f93-3bd1a10fd134",
  type: "page-type/track",
  slug: "em-beihold-groundhog-day-groundhog-day",
  ownLength: 2.89365,
  ownProgress: 2.89365,
  partOfCollections: ["release/em-beihold-groundhog-day"],
  status: "completed",
  unit: "unit/minutes",
  title: "Groundhog Day",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7o2ZQYM7nTsaVdkXY38UAA", artistName: "Em Beihold" }],
  trackKey: "groundhogday|7o2ZQYM7nTsaVdkXY38UAA|173619",
  song: "song/em-beihold-groundhog-day",
  carriedBy: [
    {
      release: "release/em-beihold-groundhog-day",
      discNumber: 1,
      position: 1,
      externalId: "0QLb1y64s617SAnnDoUZLN",
      externalLink: "https://open.spotify.com/track/0QLb1y64s617SAnnDoUZLN",
    },
  ],
} as const satisfies Track
