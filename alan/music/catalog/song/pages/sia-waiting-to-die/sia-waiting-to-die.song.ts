import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaWaitingToDie = {
  id: "019ea4cc-5b46-7681-be9b-e1e05d845f38",
  type: "page-type/song",
  slug: "sia-waiting-to-die",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5035301b-c7fd-4259-9ed9-c2c481012407",
      externalLink: "https://musicbrainz.org/work/5035301b-c7fd-4259-9ed9-c2c481012407",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Waiting to Die",
  artist: "artist/sia",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:15:16.678Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
