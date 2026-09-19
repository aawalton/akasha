import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveYouveGotAFriendLive = {
  id: "01a0abeb-3f0e-7dca-b9ba-1f934ce71ce1",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-youve-got-a-friend-live",
  ownLength: 5.146216666666667,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "66YWkE311b4O7gUjlB5NXy",
      externalLink: "https://open.spotify.com/track/66YWkE311b4O7gUjlB5NXy",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "You've Got a Friend - Live",
  trackType: "live",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "youvegotafriendlive|0vn7UBvSQECKJm2817Yf1P|308773",
  song: "song/james-taylor-youve-got-a-friend",
} as const satisfies Track
