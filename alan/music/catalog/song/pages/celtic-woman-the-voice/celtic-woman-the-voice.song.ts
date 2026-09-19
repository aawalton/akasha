import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheVoice = {
  id: "01a0b720-0b3d-751f-99a4-5c963f9916d3",
  type: "page-type/song",
  slug: "celtic-woman-the-voice",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "43b50910-7031-45f6-8df8-b608e52969fd",
      externalLink: "https://musicbrainz.org/work/43b50910-7031-45f6-8df8-b608e52969fd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Voice",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
