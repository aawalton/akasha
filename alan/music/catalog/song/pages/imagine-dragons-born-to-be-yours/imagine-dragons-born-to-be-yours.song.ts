import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsBornToBeYours = {
  id: "019ea498-ea68-7e98-b4b2-ac86ea03e366",
  type: "page-type/song",
  slug: "imagine-dragons-born-to-be-yours",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "732c07ce-3349-41b9-9406-6e734a82cff0",
      externalLink: "https://musicbrainz.org/work/732c07ce-3349-41b9-9406-6e734a82cff0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Born to Be Yours",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
