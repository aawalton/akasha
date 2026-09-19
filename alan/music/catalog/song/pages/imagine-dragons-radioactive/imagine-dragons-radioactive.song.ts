import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsRadioactive = {
  id: "019ea49c-67e2-724f-a0ff-b7bc75948325",
  type: "page-type/song",
  slug: "imagine-dragons-radioactive",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "84292c2c-b88e-4b71-8716-2b7ad7f6f2e2",
      externalLink: "https://musicbrainz.org/work/84292c2c-b88e-4b71-8716-2b7ad7f6f2e2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Radioactive",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
