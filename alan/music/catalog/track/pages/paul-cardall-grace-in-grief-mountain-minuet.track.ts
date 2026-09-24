import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallGraceInGriefMountainMinuet = {
  id: "01a0b4c8-253a-75b4-b151-47e80be46359",
  type: "page-type/track",
  slug: "paul-cardall-grace-in-grief-mountain-minuet",
  ownLength: 4.0867,
  ownProgress: 4.0867,
  partOfCollections: ["release/paul-cardall-grace-in-grief"],
  status: "completed",
  unit: "unit/minutes",
  title: "Mountain Minuet",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "mountainminuet|7FQRbf8gbKw8KZQZAJWxH2|245202",
  song: "song/paul-cardall-mountain-minuet",
  carriedBy: [
    {
      release: "release/paul-cardall-grace-in-grief",
      discNumber: 1,
      position: 2,
      externalId: "3rZ6aWM8fHbt92NeWyckS7",
      externalLink: "https://open.spotify.com/track/3rZ6aWM8fHbt92NeWyckS7",
    },
  ],
} as const satisfies Track
