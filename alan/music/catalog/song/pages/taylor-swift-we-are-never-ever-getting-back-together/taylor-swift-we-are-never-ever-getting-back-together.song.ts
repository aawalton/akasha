import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftWeAreNeverEverGettingBackTogether = {
  id: "019ea416-4940-7192-ba2a-2098c1c35a48",
  type: "page-type/song",
  slug: "taylor-swift-we-are-never-ever-getting-back-together",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "aa42d642-3771-4180-9c53-00ba22df5a4b",
      externalLink: "https://musicbrainz.org/work/aa42d642-3771-4180-9c53-00ba22df5a4b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "We Are Never Ever Getting Back Together",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
