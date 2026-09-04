import type { Song } from "../../song.page-type.ts"

export const siaMuddyFeet = {
  id: "019ea4c7-8bd0-73c7-a98e-3d72877a60b5",
  pageTypeSlug: "song",
  slug: "sia-muddy-feet",
  title: "Muddy Feet",
  artistSlug: "sia",
  externalId: "40166857-10a4-4b9b-954e-94a727c5336b",
  externalLink: "https://musicbrainz.org/work/40166857-10a4-4b9b-954e-94a727c5336b",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
