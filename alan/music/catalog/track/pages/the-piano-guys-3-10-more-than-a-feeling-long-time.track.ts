import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310MoreThanAFeelingLongTime = {
  id: "01a0afa2-0ab0-73cc-8523-c95ba0fce1c0",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-more-than-a-feeling-long-time",
  ownLength: 5.117583333333333,
  ownProgress: 5.117583333333333,
  partOfCollections: ["release/the-piano-guys-3-10"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7HCwlk7B71Bi8f8oce9kc4",
      externalLink: "https://open.spotify.com/track/7HCwlk7B71Bi8f8oce9kc4",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "More Than a Feeling / Long Time",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    { externalId: "5S1qHHFKZRXRC4qjiPXyzN", artistName: "Jake Bowen" },
  ],
  trackKey: "morethanafeelinglongtime|0jW6R8CVyVohuUJVcuweDI,5S1qHHFKZRXRC4qjiPXyzN|307055",
  song: "song/the-piano-guys-more-than-a-feeling-long-time",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 1,
      position: 4,
      externalId: "7HCwlk7B71Bi8f8oce9kc4",
      externalLink: "https://open.spotify.com/track/7HCwlk7B71Bi8f8oce9kc4",
    },
  ],
} as const satisfies Track
