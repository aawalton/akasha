import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraArtemis = {
  id: "019ea4a4-613c-74ce-9248-ddab95be0f69",
  type: "page-type/song",
  slug: "aurora-artemis",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "430b1cd9-51c3-44f9-a061-f01b5f248007",
      externalLink: "https://musicbrainz.org/work/430b1cd9-51c3-44f9-a061-f01b5f248007",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Artemis",
  artist: "artist/aurora",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:31:36.764Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
