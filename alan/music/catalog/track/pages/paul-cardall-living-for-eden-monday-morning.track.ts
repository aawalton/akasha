import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenMondayMorning = {
  id: "01a0b4c8-4b73-7489-8af4-1f7869f93d26",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-monday-morning",
  ownLength: 2.866,
  ownProgress: 2.866,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  status: "completed",
  unit: "unit/minutes",
  title: "Monday Morning",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "mondaymorning|7FQRbf8gbKw8KZQZAJWxH2|171960",
  song: "song/paul-cardall-monday-morning",
  carriedBy: [
    {
      release: "release/paul-cardall-living-for-eden",
      discNumber: 1,
      position: 17,
      externalId: "50gOseqJMbnVLmmHHFd1SF",
      externalLink: "https://open.spotify.com/track/50gOseqJMbnVLmmHHFd1SF",
    },
  ],
} as const satisfies Track
