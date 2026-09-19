import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragons1 = {
  id: "019ea496-d4ce-7612-880e-6152ce68d9bb",
  type: "page-type/song",
  slug: "imagine-dragons-1",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0653241b-bc2e-4422-9f18-157e1f7cbb17",
      externalLink: "https://musicbrainz.org/work/0653241b-bc2e-4422-9f18-157e1f7cbb17",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "#1",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
