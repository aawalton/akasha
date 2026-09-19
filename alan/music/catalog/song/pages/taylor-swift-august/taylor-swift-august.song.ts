import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftAugust = {
  id: "019ea416-0a85-73b7-a7df-61b374966e67",
  type: "page-type/song",
  slug: "taylor-swift-august",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6ce75487-483b-48a7-a988-9b16f0912e51",
      externalLink: "https://musicbrainz.org/work/6ce75487-483b-48a7-a988-9b16f0912e51",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "august",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
