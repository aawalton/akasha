import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayWarningSign = {
  id: "01a0ba5d-504d-7575-8316-813cecbad9ec",
  type: "page-type/song",
  slug: "coldplay-warning-sign",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5208e3db-8498-3d30-b34e-93e20de5df24",
      externalLink: "https://musicbrainz.org/work/5208e3db-8498-3d30-b34e-93e20de5df24",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Warning Sign",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
