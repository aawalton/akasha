import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheCelebrateLifeConcertLiveWasatchLive = {
  id: "01a0b4c8-4287-735f-99a7-02a54e019d9a",
  type: "page-type/track",
  slug: "paul-cardall-the-celebrate-life-concert-live-wasatch-live",
  ownLength: 3.6741333333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-celebrate-life-concert-live"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3cD94kaespYNz4NnTJdTnO",
      externalLink: "https://open.spotify.com/track/3cD94kaespYNz4NnTJdTnO",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Wasatch - Live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "wasatchlive|7FQRbf8gbKw8KZQZAJWxH2|220448",
  song: "song/paul-cardall-wasatch",
} as const satisfies Track
