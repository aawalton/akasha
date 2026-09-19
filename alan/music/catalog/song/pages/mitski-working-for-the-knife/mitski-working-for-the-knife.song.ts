import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiWorkingForTheKnife = {
  id: "019f0ea5-6581-7914-8c1f-d4af5ba43080",
  type: "page-type/song",
  slug: "mitski-working-for-the-knife",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b5d844af-452f-408a-94ac-e824d7ca45c2",
      externalLink: "https://musicbrainz.org/work/b5d844af-452f-408a-94ac-e824d7ca45c2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Working for the Knife",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
