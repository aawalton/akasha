import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanOroSeDoBheathaAbhaile = {
  id: "01a0b720-1240-72ec-bde9-1b65e23f1dbb",
  type: "page-type/song",
  slug: "celtic-woman-oro-se-do-bheatha-abhaile",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b5b2be17-6eb7-3d13-a9f1-701890c7606a",
      externalLink: "https://musicbrainz.org/work/b5b2be17-6eb7-3d13-a9f1-701890c7606a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Óró sé do bheatha abhaile",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
