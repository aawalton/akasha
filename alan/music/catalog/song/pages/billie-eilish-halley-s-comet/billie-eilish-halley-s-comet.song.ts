import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishHalleySComet = {
  id: "019ea4a9-5dc9-79b8-b964-d7418e8fff57",
  type: "page-type/song",
  slug: "billie-eilish-halley-s-comet",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4ad19067-b543-4a1e-9c70-7f2367ecb91b",
      externalLink: "https://musicbrainz.org/work/4ad19067-b543-4a1e-9c70-7f2367ecb91b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Halley’s Comet",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
