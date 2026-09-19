import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsNothingLeftToSay = {
  id: "019ea498-df2c-7077-b39e-292ba9d90543",
  type: "page-type/song",
  slug: "imagine-dragons-nothing-left-to-say",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "71559db0-7ecf-4724-b814-46860b044e62",
      externalLink: "https://musicbrainz.org/work/71559db0-7ecf-4724-b814-46860b044e62",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Nothing Left to Say",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
