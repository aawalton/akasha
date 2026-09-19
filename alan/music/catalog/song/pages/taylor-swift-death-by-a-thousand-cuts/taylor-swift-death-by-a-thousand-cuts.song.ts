import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftDeathByAThousandCuts = {
  id: "019ea416-064f-75c7-ae8b-158630223074",
  type: "page-type/song",
  slug: "taylor-swift-death-by-a-thousand-cuts",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3a8bdd7f-50a0-48e1-9186-93e7f976d00b",
      externalLink: "https://musicbrainz.org/work/3a8bdd7f-50a0-48e1-9186-93e7f976d00b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Death by a Thousand Cuts",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
