import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterHands = {
  id: "01a0b723-cede-7eff-8a0e-3750d2be6a4f",
  type: "page-type/song",
  slug: "sabrina-carpenter-hands",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ecdd6b38-e7f1-4dee-913e-fb154f2ec915",
      externalLink: "https://musicbrainz.org/work/ecdd6b38-e7f1-4dee-913e-fb154f2ec915",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Hands",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T00:49:32.382Z",
  updatedAt: "2026-09-19T16:49:35.000Z",
} as const satisfies Song
