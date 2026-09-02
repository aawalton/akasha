import type { Song } from "../../song.page-type.ts"

export const taylorSwiftOpalite = {
  id: "019ea416-3f9b-7a30-9e96-f40b6ec05f9a",
  pageTypeSlug: "song",
  slug: "taylor-swift-opalite",
  title: "Opalite",
  artistSlug: "taylor-swift",
  externalId: "eb78d1a6-9d61-4f21-a49e-cca7160a21e2",
  externalLink: "https://musicbrainz.org/work/eb78d1a6-9d61-4f21-a49e-cca7160a21e2",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
