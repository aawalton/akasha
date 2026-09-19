import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeTheWizardAndI = {
  id: "019ea4e5-bb10-7003-9800-30be01c7e881",
  type: "page-type/song",
  slug: "ariana-grande-the-wizard-and-i",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "671da31c-d32b-4752-80b3-9efb10de96fd",
      externalLink: "https://musicbrainz.org/work/671da31c-d32b-4752-80b3-9efb10de96fd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Wizard and I",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
