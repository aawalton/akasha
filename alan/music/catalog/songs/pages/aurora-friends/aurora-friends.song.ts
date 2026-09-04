import type { Song } from "../../song.page-type.ts"

export const auroraFriends = {
  id: "019ea4a3-ea83-7bde-beae-2b285a54d2fd",
  pageTypeSlug: "song",
  slug: "aurora-friends",
  title: "Friends",
  artistSlug: "aurora",
  externalId: "2c452d29-c0ab-4395-b5c9-1fd983aadbf9",
  externalLink: "https://musicbrainz.org/work/2c452d29-c0ab-4395-b5c9-1fd983aadbf9",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
