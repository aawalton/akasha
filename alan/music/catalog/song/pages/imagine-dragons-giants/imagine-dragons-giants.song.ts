import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsGiants = {
  id: "019ea498-b518-793c-94ce-e5100bb55d7d",
  type: "page-type/song",
  slug: "imagine-dragons-giants",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6cabda01-e13a-422f-bf72-50e7a7dc876b",
      externalLink: "https://musicbrainz.org/work/6cabda01-e13a-422f-bf72-50e7a7dc876b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Giants",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
