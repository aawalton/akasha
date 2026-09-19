import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftHowYouGetTheGirl = {
  id: "019ea416-195e-779d-a672-62c42bec1ba7",
  type: "page-type/song",
  slug: "taylor-swift-how-you-get-the-girl",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0d79d824-d6ae-4961-ad52-cf81b611e2d6",
      externalLink: "https://musicbrainz.org/work/0d79d824-d6ae-4961-ad52-cf81b611e2d6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "How You Get the Girl",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
