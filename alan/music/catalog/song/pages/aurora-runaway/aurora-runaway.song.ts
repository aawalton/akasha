import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraRunaway = {
  id: "019ea4a2-ea0b-7a3e-9e49-d35a7e465b1e",
  type: "page-type/song",
  slug: "aurora-runaway",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0200883f-75ce-4a49-90e9-3305f331844b",
      externalLink: "https://musicbrainz.org/work/0200883f-75ce-4a49-90e9-3305f331844b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Runaway",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
