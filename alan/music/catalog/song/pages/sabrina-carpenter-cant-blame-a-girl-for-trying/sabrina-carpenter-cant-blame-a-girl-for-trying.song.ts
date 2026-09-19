import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterCantBlameAGirlForTrying = {
  id: "01a0b723-c2e1-7e15-a7a9-f0559ea71181",
  type: "page-type/song",
  slug: "sabrina-carpenter-cant-blame-a-girl-for-trying",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "30f92aa8-6fc8-4266-a758-441f84bc9c3a",
      externalLink: "https://musicbrainz.org/work/30f92aa8-6fc8-4266-a758-441f84bc9c3a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Can’t Blame a Girl for Trying",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
