import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonAnytime = {
  id: "019ea4b0-25ee-7164-8713-7d1db6fdc10e",
  type: "page-type/song",
  slug: "kelly-clarkson-anytime",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "caa60276-88a7-4627-93f2-1adf9e95aeb2",
      externalLink: "https://musicbrainz.org/work/caa60276-88a7-4627-93f2-1adf9e95aeb2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Anytime",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
