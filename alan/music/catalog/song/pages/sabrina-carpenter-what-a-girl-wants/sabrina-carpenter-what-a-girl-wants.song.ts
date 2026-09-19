import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterWhatAGirlWants = {
  id: "01a0b723-da3a-7056-be3c-b6f973093675",
  type: "page-type/song",
  slug: "sabrina-carpenter-what-a-girl-wants",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f94fe2bd-00a0-31ab-ba1d-00ae186f798b",
      externalLink: "https://musicbrainz.org/work/f94fe2bd-00a0-31ab-ba1d-00ae186f798b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "What a Girl Wants",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
