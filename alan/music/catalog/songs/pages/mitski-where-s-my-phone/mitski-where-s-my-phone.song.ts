import type { Song } from "../../song.page-type.ts"

export const mitskiWhereSMyPhone = {
  id: "019f0e9d-6f48-7017-b185-9e84579925f6",
  pageTypeSlug: "song",
  slug: "mitski-where-s-my-phone",
  title: "Where’s My Phone?",
  artistSlug: "mitski",
  externalId: "23aa02c5-714a-498f-98df-1b720ecae65c",
  externalLink: "https://musicbrainz.org/work/23aa02c5-714a-498f-98df-1b720ecae65c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
