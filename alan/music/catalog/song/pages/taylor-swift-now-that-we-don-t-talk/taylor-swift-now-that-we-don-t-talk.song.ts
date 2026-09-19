import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftNowThatWeDonTTalk = {
  id: "019ea416-3e46-7aa5-a11e-a453598f7d53",
  type: "page-type/song",
  slug: "taylor-swift-now-that-we-don-t-talk",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dbbc2e33-54f9-4b16-9851-0f9d03e6d05e",
      externalLink: "https://musicbrainz.org/work/dbbc2e33-54f9-4b16-9851-0f9d03e6d05e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Now That We Don’t Talk",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
