import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaIfTheEarthIsSpinning = {
  id: "019ea4c8-5438-7316-9cbf-66302c8dd0b3",
  type: "page-type/song",
  slug: "sia-if-the-earth-is-spinning",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6e000f3d-3100-4dd2-89b5-59988467cf67",
      externalLink: "https://musicbrainz.org/work/6e000f3d-3100-4dd2-89b5-59988467cf67",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "If the Earth Is Spinning",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
