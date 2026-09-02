import type { Song } from "../../song.page-type.ts"

export const arianaGrandeDandelion = {
  id: "019ea4e3-efdb-7202-95e7-23d0f4866804",
  pageTypeSlug: "song",
  slug: "ariana-grande-dandelion",
  title: "dandelion",
  artistSlug: "ariana-grande",
  externalId: "ed7e1ac0-10eb-47cd-9ea5-ded05b629991",
  externalLink: "https://musicbrainz.org/work/ed7e1ac0-10eb-47cd-9ea5-ded05b629991",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
