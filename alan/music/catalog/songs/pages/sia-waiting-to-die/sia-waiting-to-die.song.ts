import type { Song } from "../../song.page-type.ts"

export const siaWaitingToDie = {
  id: "019ea4cc-5b46-7681-be9b-e1e05d845f38",
  pageTypeSlug: "song",
  slug: "sia-waiting-to-die",
  title: "Waiting to Die",
  artistSlug: "sia",
  externalId: "5035301b-c7fd-4259-9ed9-c2c481012407",
  externalLink: "https://musicbrainz.org/work/5035301b-c7fd-4259-9ed9-c2c481012407",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
