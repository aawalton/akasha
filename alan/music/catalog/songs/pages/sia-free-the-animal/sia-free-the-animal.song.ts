import type { Song } from "../../song.page-type.ts"

export const siaFreeTheAnimal = {
  id: "019ea4c6-833c-7e74-979e-8f00c237434e",
  pageTypeSlug: "song",
  slug: "sia-free-the-animal",
  title: "Free the Animal",
  artistSlug: "sia",
  externalId: "0178adc5-8239-415f-92ba-66eafef78199",
  externalLink: "https://musicbrainz.org/work/0178adc5-8239-415f-92ba-66eafef78199",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
