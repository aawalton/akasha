import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsVol2MoreHolinessGiveMe = {
  id: "01a0b4c8-5e4d-789b-9598-42f865ef364d",
  type: "page-type/track",
  slug: "paul-cardall-hymns-vol-2-more-holiness-give-me",
  ownLength: 3.1431,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-hymns-vol-2"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0M5HsaX3uVfmjpvVZCQXJL",
      externalLink: "https://open.spotify.com/track/0M5HsaX3uVfmjpvVZCQXJL",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "More Holiness Give Me",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "moreholinessgiveme|7FQRbf8gbKw8KZQZAJWxH2|188586",
  song: "song/paul-cardall-more-holiness-give-me",
} as const satisfies Track
