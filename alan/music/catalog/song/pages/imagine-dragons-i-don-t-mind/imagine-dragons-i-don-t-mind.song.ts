import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsIDonTMind = {
  id: "019ea49b-0f07-77eb-a53f-6985c9bfcf41",
  type: "page-type/song",
  slug: "imagine-dragons-i-don-t-mind",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ed883182-fc13-41b0-831c-9f46df81d674",
      externalLink: "https://musicbrainz.org/work/ed883182-fc13-41b0-831c-9f46df81d674",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Don’t Mind",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
