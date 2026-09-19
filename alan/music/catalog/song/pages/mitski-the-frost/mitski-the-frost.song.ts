import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiTheFrost = {
  id: "019f0ea1-d134-7c6f-9f63-6d67115005e4",
  type: "page-type/song",
  slug: "mitski-the-frost",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7343df08-4abb-49ac-91ab-f9302a34233c",
      externalLink: "https://musicbrainz.org/work/7343df08-4abb-49ac-91ab-f9302a34233c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Frost",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
