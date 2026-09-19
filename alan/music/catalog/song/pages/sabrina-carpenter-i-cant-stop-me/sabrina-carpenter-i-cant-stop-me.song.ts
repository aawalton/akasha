import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterICantStopMe = {
  id: "01a0b723-c91b-7987-bc8a-c8eaebfdebe7",
  type: "page-type/song",
  slug: "sabrina-carpenter-i-cant-stop-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "825a1197-e42f-4964-9920-8573b5ae3dd6",
      externalLink: "https://musicbrainz.org/work/825a1197-e42f-4964-9920-8573b5ae3dd6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Can’t Stop Me",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
