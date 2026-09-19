import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsLove = {
  id: "019ea499-d83c-7860-becf-7dac530dce32",
  type: "page-type/song",
  slug: "imagine-dragons-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a811a402-7f5b-4f56-88b2-15d57f21c8b6",
      externalLink: "https://musicbrainz.org/work/a811a402-7f5b-4f56-88b2-15d57f21c8b6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Love",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
