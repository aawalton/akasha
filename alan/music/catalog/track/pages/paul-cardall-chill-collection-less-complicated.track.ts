import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionLessComplicated = {
  id: "01a0b4c8-44df-7a8d-b274-178e92cf90dc",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-less-complicated",
  ownLength: 4.334133333333333,
  ownProgress: 4.334133333333333,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  position: 3,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1g5FjnHwDGG2j2YuW9QcM4",
      externalLink: "https://open.spotify.com/track/1g5FjnHwDGG2j2YuW9QcM4",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Less Complicated",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "lesscomplicated|7FQRbf8gbKw8KZQZAJWxH2|260048",
  song: "song/paul-cardall-less-complicated",
  carriedBy: [
    {
      release: "release/paul-cardall-chill-collection",
      discNumber: 1,
      position: 3,
      externalId: "1g5FjnHwDGG2j2YuW9QcM4",
      externalLink: "https://open.spotify.com/track/1g5FjnHwDGG2j2YuW9QcM4",
    },
  ],
} as const satisfies Track
