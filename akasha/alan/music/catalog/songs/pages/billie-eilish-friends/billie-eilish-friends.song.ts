import type { Song } from "../../song.page-type.ts"

export const billieEilishFriends = {
  id: "019ea4a9-2588-73d2-8e8a-f15a56eef047",
  pageTypeSlug: "song",
  slug: "billie-eilish-friends",
  title: "Friends",
  artistSlug: "billie-eilish",
  externalId: "4591cc25-2e07-4969-ba66-6f4f0f508e81",
  externalLink: "https://musicbrainz.org/work/4591cc25-2e07-4969-ba66-6f4f0f508e81",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
