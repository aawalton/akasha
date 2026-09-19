import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterWeAlmostBrokeUpAgainLastNight = {
  id: "01a0b723-d5b4-787d-b3a1-6ff25b7ff9a2",
  type: "page-type/song",
  slug: "sabrina-carpenter-we-almost-broke-up-again-last-night",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9665382f-29ce-4ec2-865f-ee14e451e506",
      externalLink: "https://musicbrainz.org/work/9665382f-29ce-4ec2-865f-ee14e451e506",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "We Almost Broke Up Again Last Night",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
