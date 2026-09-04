import type { Song } from "../../song.page-type.ts"

export const arianaGrandeOhSanta = {
  id: "019ea4e7-295f-72eb-85b8-cc48d89983f0",
  pageTypeSlug: "song",
  slug: "ariana-grande-oh-santa",
  title: "Oh Santa!",
  artistSlug: "ariana-grande",
  externalId: "ab956891-dbf7-44e0-8ae9-8e26e696f0b7",
  externalLink: "https://musicbrainz.org/work/ab956891-dbf7-44e0-8ae9-8e26e696f0b7",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
