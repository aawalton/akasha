import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorAnywhereLikeHeaven = {
  id: "01a0b72f-228a-77e2-96a8-025e8e9388b8",
  type: "page-type/song",
  slug: "james-taylor-anywhere-like-heaven",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "27d9dbbd-d1f0-38f6-a0dd-937e0c50dcf5",
      externalLink: "https://musicbrainz.org/work/27d9dbbd-d1f0-38f6-a0dd-937e0c50dcf5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Anywhere Like Heaven",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
