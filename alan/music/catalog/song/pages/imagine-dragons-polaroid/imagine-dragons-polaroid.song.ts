import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsPolaroid = {
  id: "019ea49b-d88f-7a8b-8652-5792ae13c276",
  type: "page-type/song",
  slug: "imagine-dragons-polaroid",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "396719c3-c652-4b3c-a264-a709c54a6343",
      externalLink: "https://musicbrainz.org/work/396719c3-c652-4b3c-a264-a709c54a6343",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Polaroid",
  artist: "artist/imagine-dragons",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
