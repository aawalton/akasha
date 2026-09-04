import type { Song } from "../../song.page-type.ts"

export const mitskiFireworks = {
  id: "019f0ea4-cad6-7cd3-9b04-050d0f2f7dda",
  pageTypeSlug: "song",
  slug: "mitski-fireworks",
  title: "Fireworks",
  artistSlug: "mitski",
  externalId: "ae0adb27-8f05-4bbc-b10c-0aa993c7e70d",
  externalLink: "https://musicbrainz.org/work/ae0adb27-8f05-4bbc-b10c-0aa993c7e70d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
