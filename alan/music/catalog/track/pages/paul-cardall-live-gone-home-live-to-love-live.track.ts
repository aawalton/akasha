import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLiveGoneHomeLiveToLoveLive = {
  id: "01a0b4c8-575f-7e49-b615-e84f79508a02",
  type: "page-type/track",
  slug: "paul-cardall-live-gone-home-live-to-love-live",
  ownLength: 4.114216666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-live"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6hqxxYa2FCv9iWLp3hMtrp",
      externalLink: "https://open.spotify.com/track/6hqxxYa2FCv9iWLp3hMtrp",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Gone Home/Live To Love - Live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "gonehomelivetolovelive|7FQRbf8gbKw8KZQZAJWxH2|246853",
  song: "song/paul-cardall-gone-home-live-to-love",
} as const satisfies Track
