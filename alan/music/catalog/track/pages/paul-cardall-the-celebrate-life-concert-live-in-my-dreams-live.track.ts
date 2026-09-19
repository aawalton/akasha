import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheCelebrateLifeConcertLiveInMyDreamsLive = {
  id: "01a0b4c8-42e9-72f7-a9c3-b3a3aea3e7b4",
  type: "page-type/track",
  slug: "paul-cardall-the-celebrate-life-concert-live-in-my-dreams-live",
  ownLength: 3.8003833333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-celebrate-life-concert-live"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3LQtkryY5TRd6Gfd6jPzxJ",
      externalLink: "https://open.spotify.com/track/3LQtkryY5TRd6Gfd6jPzxJ",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "In My Dreams - Live",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" },
    { externalId: "7muihwIKkXMGBY7gcIvPJI", artistName: "Charley Jenkins" },
  ],
  trackKey: "inmydreamslive|7FQRbf8gbKw8KZQZAJWxH2,7muihwIKkXMGBY7gcIvPJI|228023",
  song: "song/paul-cardall-in-my-dreams",
} as const satisfies Track
