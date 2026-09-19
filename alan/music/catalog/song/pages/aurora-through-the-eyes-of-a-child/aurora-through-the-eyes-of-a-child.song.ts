import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraThroughTheEyesOfAChild = {
  id: "019ea4a5-7f5b-770e-bc11-62d866a1fde3",
  type: "page-type/song",
  slug: "aurora-through-the-eyes-of-a-child",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "63e79667-ac86-4a9d-85f0-7dd577de7b9e",
      externalLink: "https://musicbrainz.org/work/63e79667-ac86-4a9d-85f0-7dd577de7b9e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Through the Eyes of a Child",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
