import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorRockRollIsMusicNow = {
  id: "01a0b72f-428c-7ba1-a07b-aa0e5578665d",
  type: "page-type/song",
  slug: "james-taylor-rock-roll-is-music-now",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d3cf6b84-1c68-4c19-85a6-5a71a8553cb2",
      externalLink: "https://musicbrainz.org/work/d3cf6b84-1c68-4c19-85a6-5a71a8553cb2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Rock & Roll Is Music Now",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
} as const satisfies Song
