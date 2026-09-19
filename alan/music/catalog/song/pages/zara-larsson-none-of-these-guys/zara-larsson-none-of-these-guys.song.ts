import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonNoneOfTheseGuys = {
  id: "019ea49f-295e-7400-9d0d-7588e7ca594e",
  type: "page-type/song",
  slug: "zara-larsson-none-of-these-guys",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4853b611-a6c9-4395-a3a0-8bf612c66b7f",
      externalLink: "https://musicbrainz.org/work/4853b611-a6c9-4395-a3a0-8bf612c66b7f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "None of These Guys",
  artist: "artist/zara-larsson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
