import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiShouldVeBeenMe = {
  id: "019f0ea1-5435-7ffa-8e1c-60f3b51149db",
  type: "page-type/song",
  slug: "mitski-should-ve-been-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6367fd5d-5242-4046-89c2-093dace4b5e1",
      externalLink: "https://musicbrainz.org/work/6367fd5d-5242-4046-89c2-093dace4b5e1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Should’ve Been Me",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
