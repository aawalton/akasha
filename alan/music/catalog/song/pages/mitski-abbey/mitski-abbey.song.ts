import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiAbbey = {
  id: "019f0ea1-6e8b-78b1-b8ca-76ad280f6697",
  type: "page-type/song",
  slug: "mitski-abbey",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6a6c7967-2f7b-4a54-878b-bf04e06553e1",
      externalLink: "https://musicbrainz.org/work/6a6c7967-2f7b-4a54-878b-bf04e06553e1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Abbey",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
