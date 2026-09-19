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
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
