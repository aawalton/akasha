import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiNobody = {
  id: "019f0ea7-528c-7000-9a20-65d8ae05c840",
  type: "page-type/song",
  slug: "mitski-nobody",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dbc6799a-51de-45de-a7a8-c0d18e718881",
      externalLink: "https://musicbrainz.org/work/dbc6799a-51de-45de-a7a8-c0d18e718881",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Nobody",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
