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
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
