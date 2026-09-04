import type { Song } from "../../song.page-type.ts"

export const mitskiBagOfBones = {
  id: "019f0ea0-b4c0-73df-bcaa-a68d653fdaf0",
  pageTypeSlug: "song",
  slug: "mitski-bag-of-bones",
  title: "Bag of Bones",
  artistSlug: "mitski",
  externalId: "587bc1b8-5d9e-4c83-973f-781791198394",
  externalLink: "https://musicbrainz.org/work/587bc1b8-5d9e-4c83-973f-781791198394",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
