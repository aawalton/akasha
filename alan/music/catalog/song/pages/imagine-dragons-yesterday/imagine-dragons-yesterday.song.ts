import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsYesterday = {
  id: "019ea49c-cb96-7d0c-bf1b-36356ab91772",
  type: "page-type/song",
  slug: "imagine-dragons-yesterday",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d4b54014-67fb-43b8-8513-0c3acb3722e3",
      externalLink: "https://musicbrainz.org/work/d4b54014-67fb-43b8-8513-0c3acb3722e3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Yesterday",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
