import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsLevitate = {
  id: "019ea49a-61b8-7445-8bd0-429ff9fbcb44",
  type: "page-type/song",
  slug: "imagine-dragons-levitate",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c1896cc5-bc55-4740-b482-c1e5c0299950",
      externalLink: "https://musicbrainz.org/work/c1896cc5-bc55-4740-b482-c1e5c0299950",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Levitate",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
