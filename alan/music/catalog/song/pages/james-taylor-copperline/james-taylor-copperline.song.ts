import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorCopperline = {
  id: "01a0b72f-2521-7cd7-9f6a-10c17bfe0232",
  type: "page-type/song",
  slug: "james-taylor-copperline",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5480d1a0-c1fe-329d-9b47-434bc08a5af9",
      externalLink: "https://musicbrainz.org/work/5480d1a0-c1fe-329d-9b47-434bc08a5af9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Copperline",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
