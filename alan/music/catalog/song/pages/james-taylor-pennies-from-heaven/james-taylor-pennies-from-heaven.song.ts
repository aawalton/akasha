import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorPenniesFromHeaven = {
  id: "01a0b72f-3897-7b46-a91d-1182e3f11920",
  type: "page-type/song",
  slug: "james-taylor-pennies-from-heaven",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "749be9c3-84ef-3e48-8fa1-844e3de1e5ad",
      externalLink: "https://musicbrainz.org/work/749be9c3-84ef-3e48-8fa1-844e3de1e5ad",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Pennies From Heaven",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
