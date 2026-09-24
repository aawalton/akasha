import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifePassingTime = {
  id: "01a0b4c8-3fcc-7678-888d-bd90ae731370",
  type: "page-type/track",
  slug: "paul-cardall-new-life-passing-time",
  ownLength: 3.9937666666666667,
  ownProgress: 3.9937666666666667,
  partOfCollections: ["release/paul-cardall-new-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "Passing Time",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "passingtime|7FQRbf8gbKw8KZQZAJWxH2|239626",
  song: "song/paul-cardall-passing-time",
  carriedBy: [
    {
      release: "release/paul-cardall-new-life",
      discNumber: 1,
      position: 10,
      externalId: "4GnoTuKVMJqKg44XY9G6gp",
      externalLink: "https://open.spotify.com/track/4GnoTuKVMJqKg44XY9G6gp",
    },
  ],
} as const satisfies Track
