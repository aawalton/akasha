import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2LiveAtTheTroubadourYouveGotAFriendLiveAtTheTroubadour2007 = {
  id: "01a0abeb-327b-79d8-b120-d19da259447a",
  type: "page-type/track",
  slug: "james-taylor-2-live-at-the-troubadour-youve-got-a-friend-live-at-the-troubadour-2007",
  ownLength: 5.86,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-live-at-the-troubadour"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7jNvvrEFtIQYnaukWx5ZSu",
      externalLink: "https://open.spotify.com/track/7jNvvrEFtIQYnaukWx5ZSu",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "You’ve Got A Friend - Live At The Troubadour / 2007",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "319yZVtYM9MBGqmSQnMyY6", artistName: "Carole King" },
    { externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" },
  ],
  trackKey:
    "youvegotafriendliveatthetroubadour2007|0vn7UBvSQECKJm2817Yf1P,319yZVtYM9MBGqmSQnMyY6|351600",
  song: "song/james-taylor-youve-got-a-friend",
} as const satisfies Track
