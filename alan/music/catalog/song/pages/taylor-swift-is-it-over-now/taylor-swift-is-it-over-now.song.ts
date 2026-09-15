import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIsItOverNow = {
  id: "019ea416-1cac-744d-9fc8-3d77a843f127",
  type: "song",
  slug: "taylor-swift-is-it-over-now",
  title: "Is It Over Now?",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "33df29b6-ffd0-4572-881b-f2232af7ae25",
      externalLink: "https://musicbrainz.org/work/33df29b6-ffd0-4572-881b-f2232af7ae25",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
