import type { Song } from "../../song.page-type.ts"

export const arianaGrandeMoonlight = {
  id: "019ea4e7-81a8-79d0-a98e-e18a41bbf795",
  pageTypeSlug: "song",
  slug: "ariana-grande-moonlight",
  title: "Moonlight",
  artistSlug: "ariana-grande",
  externalId: "c74896b9-7f3a-4a3d-b17a-badd2eb64eb1",
  externalLink: "https://musicbrainz.org/work/c74896b9-7f3a-4a3d-b17a-badd2eb64eb1",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
