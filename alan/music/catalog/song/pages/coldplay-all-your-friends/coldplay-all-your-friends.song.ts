import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayAllYourFriends = {
  id: "01a0ba5d-3ee0-7b52-9eed-ca4e3b7e4363",
  type: "page-type/song",
  slug: "coldplay-all-your-friends",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "75ca50e1-235d-4ec0-88f9-0313fe365421",
      externalLink: "https://musicbrainz.org/work/75ca50e1-235d-4ec0-88f9-0313fe365421",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All Your Friends",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
