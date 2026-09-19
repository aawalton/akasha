import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishFriends = {
  id: "019ea4a9-2588-73d2-8e8a-f15a56eef047",
  type: "page-type/song",
  slug: "billie-eilish-friends",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4591cc25-2e07-4969-ba66-6f4f0f508e81",
      externalLink: "https://musicbrainz.org/work/4591cc25-2e07-4969-ba66-6f4f0f508e81",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Friends",
  artist: "artist/billie-eilish",
  performed: true,
  written: "collab",
} as const satisfies Song
