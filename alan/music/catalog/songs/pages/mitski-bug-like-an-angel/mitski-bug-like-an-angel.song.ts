import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const mitskiBugLikeAnAngel = {
  id: "019f0ea0-8c81-76a5-b6a8-b62f89bba006",
  type: "song",
  slug: "mitski-bug-like-an-angel",
  title: "Bug Like an Angel",
  artist: "artist/mitski",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "52d90143-15d0-4b52-97fa-fe95dad63469",
      externalLink: "https://musicbrainz.org/work/52d90143-15d0-4b52-97fa-fe95dad63469",
      lastSyncedAt: "2026-06-28",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
