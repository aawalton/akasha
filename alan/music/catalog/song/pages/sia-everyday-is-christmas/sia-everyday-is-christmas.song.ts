import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaEverydayIsChristmas = {
  id: "019ea4c5-7b55-76e0-827f-d0fca75beedc",
  type: "page-type/song",
  slug: "sia-everyday-is-christmas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b83189f3-20f9-44a1-b87c-24dc658506fb",
      externalLink: "https://musicbrainz.org/work/b83189f3-20f9-44a1-b87c-24dc658506fb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Everyday Is Christmas",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
