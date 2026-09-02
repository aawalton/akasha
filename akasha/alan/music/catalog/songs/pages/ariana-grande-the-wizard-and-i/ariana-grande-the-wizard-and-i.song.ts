import type { Song } from "../../song.page-type.ts"

export const arianaGrandeTheWizardAndI = {
  id: "019ea4e5-bb10-7003-9800-30be01c7e881",
  pageTypeSlug: "song",
  slug: "ariana-grande-the-wizard-and-i",
  title: "The Wizard and I",
  artistSlug: "ariana-grande",
  externalId: "671da31c-d32b-4752-80b3-9efb10de96fd",
  externalLink: "https://musicbrainz.org/work/671da31c-d32b-4752-80b3-9efb10de96fd",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
