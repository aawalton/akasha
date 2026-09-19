import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanWildMountainThyme = {
  id: "01a0b720-0cf8-7232-a573-158679a18120",
  type: "page-type/song",
  slug: "celtic-woman-wild-mountain-thyme",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5b3d99f0-d7ce-4f75-9569-0fc708937727",
      externalLink: "https://musicbrainz.org/work/5b3d99f0-d7ce-4f75-9569-0fc708937727",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wild Mountain Thyme",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
