import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanBeyondTheSea = {
  id: "01a0b720-08ec-7954-9c53-c329992aa25b",
  type: "page-type/song",
  slug: "celtic-woman-beyond-the-sea",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "23b7b9fd-09d7-3878-9783-8a55814466b1",
      externalLink: "https://musicbrainz.org/work/23b7b9fd-09d7-3878-9783-8a55814466b1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Beyond the Sea",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
