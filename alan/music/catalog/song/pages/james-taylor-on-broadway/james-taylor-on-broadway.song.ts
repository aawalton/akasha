import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorOnBroadway = {
  id: "01a0b72f-3248-7e48-82bf-a2b7997f0391",
  type: "page-type/song",
  slug: "james-taylor-on-broadway",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0485a995-6e14-37d5-aa4c-e285e7bf8cc3",
      externalLink: "https://musicbrainz.org/work/0485a995-6e14-37d5-aa4c-e285e7bf8cc3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "On Broadway",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
