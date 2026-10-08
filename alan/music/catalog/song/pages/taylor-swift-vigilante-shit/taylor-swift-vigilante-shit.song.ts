import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftVigilanteShit = {
  id: "019ea416-44a0-7577-b2bb-d4b79d859cd9",
  type: "page-type/song",
  slug: "taylor-swift-vigilante-shit",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "36330f36-f59a-47d4-9cfe-9434b8d25e88",
      externalLink: "https://musicbrainz.org/work/36330f36-f59a-47d4-9cfe-9434b8d25e88",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Vigilante Shit",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:23.328Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
