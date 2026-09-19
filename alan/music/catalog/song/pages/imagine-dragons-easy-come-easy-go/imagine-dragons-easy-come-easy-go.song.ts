import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsEasyComeEasyGo = {
  id: "019ea499-7b5e-718f-9641-174952af0603",
  type: "page-type/song",
  slug: "imagine-dragons-easy-come-easy-go",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8f66161a-085d-47e2-98b6-6e75e0b4e51c",
      externalLink: "https://musicbrainz.org/work/8f66161a-085d-47e2-98b6-6e75e0b4e51c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Easy Come Easy Go",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
