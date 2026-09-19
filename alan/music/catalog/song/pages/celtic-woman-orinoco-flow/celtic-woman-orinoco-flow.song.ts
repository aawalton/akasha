import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanOrinocoFlow = {
  id: "01a0b720-0ddd-7e3f-b935-d83076f1e041",
  type: "page-type/song",
  slug: "celtic-woman-orinoco-flow",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "693798ac-7f99-34e9-9622-0668c564bd03",
      externalLink: "https://musicbrainz.org/work/693798ac-7f99-34e9-9622-0668c564bd03",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Orinoco Flow",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
