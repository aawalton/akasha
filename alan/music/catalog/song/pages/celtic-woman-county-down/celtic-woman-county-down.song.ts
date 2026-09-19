import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanCountyDown = {
  id: "01a0b720-142e-77ae-bd38-a699afc85caf",
  type: "page-type/song",
  slug: "celtic-woman-county-down",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c561aac5-6b07-4ff6-bcc6-d6354f9ab2ba",
      externalLink: "https://musicbrainz.org/work/c561aac5-6b07-4ff6-bcc6-d6354f9ab2ba",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "County Down",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
