import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsIDonTKnowWhy = {
  id: "019ea497-70c0-77b5-9bdd-79f6f2d4aac2",
  type: "page-type/song",
  slug: "imagine-dragons-i-don-t-know-why",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3867f200-8807-48ad-90a3-992fb93d41ff",
      externalLink: "https://musicbrainz.org/work/3867f200-8807-48ad-90a3-992fb93d41ff",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Don’t Know Why",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
