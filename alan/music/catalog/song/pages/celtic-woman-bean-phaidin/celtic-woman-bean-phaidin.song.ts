import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanBeanPhaidin = {
  id: "01a0b720-0d70-72e2-930d-057f2fae19b0",
  type: "page-type/song",
  slug: "celtic-woman-bean-phaidin",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "682fcebb-0580-409d-9e6c-4deba5140ebc",
      externalLink: "https://musicbrainz.org/work/682fcebb-0580-409d-9e6c-4deba5140ebc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bean Pháidín",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
