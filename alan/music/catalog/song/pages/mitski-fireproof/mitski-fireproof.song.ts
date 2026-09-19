import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiFireproof = {
  id: "019f0ea8-6914-7acc-809e-d6631c32438d",
  type: "page-type/song",
  slug: "mitski-fireproof",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f336153d-776e-4277-8409-90869d1791d1",
      externalLink: "https://musicbrainz.org/work/f336153d-776e-4277-8409-90869d1791d1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fireproof",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
