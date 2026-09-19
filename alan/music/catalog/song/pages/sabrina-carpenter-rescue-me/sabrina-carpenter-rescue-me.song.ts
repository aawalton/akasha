import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterRescueMe = {
  id: "01a0b723-c3c2-7e70-97d2-63c541b75843",
  type: "page-type/song",
  slug: "sabrina-carpenter-rescue-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "35be7790-69f9-488d-aacd-cc98121ad76a",
      externalLink: "https://musicbrainz.org/work/35be7790-69f9-488d-aacd-cc98121ad76a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Rescue Me",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
