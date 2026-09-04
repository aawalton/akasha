import type { Song } from "../../song.page-type.ts"

export const billieEilishFingersCrossed = {
  id: "019ea4a9-c70c-7ede-94de-90a8f0a403e8",
  pageTypeSlug: "song",
  slug: "billie-eilish-fingers-crossed",
  title: "Fingers Crossed",
  artistSlug: "billie-eilish",
  externalId: "65d335b9-89f7-4dfe-8911-4e13108286c0",
  externalLink: "https://musicbrainz.org/work/65d335b9-89f7-4dfe-8911-4e13108286c0",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
} as const satisfies Song
