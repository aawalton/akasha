import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIsItOverNow = {
  id: "019ea416-1cac-744d-9fc8-3d77a843f127",
  type: "page-type/song",
  slug: "taylor-swift-is-it-over-now",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "33df29b6-ffd0-4572-881b-f2232af7ae25",
      externalLink: "https://musicbrainz.org/work/33df29b6-ffd0-4572-881b-f2232af7ae25",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Is It Over Now?",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
