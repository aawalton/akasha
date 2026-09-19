import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanBridgeOverTroubledWater = {
  id: "01a0b720-0725-780c-8e9d-6b766dc46567",
  type: "page-type/song",
  slug: "celtic-woman-bridge-over-troubled-water",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "048976c0-44b3-3da7-85cf-2da8341b1e66",
      externalLink: "https://musicbrainz.org/work/048976c0-44b3-3da7-85cf-2da8341b1e66",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bridge Over Troubled Water",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
