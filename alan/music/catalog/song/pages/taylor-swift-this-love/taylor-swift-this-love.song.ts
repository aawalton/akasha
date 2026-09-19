import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftThisLove = {
  id: "019ea416-4320-78e2-9474-cdbf0048bf5e",
  type: "page-type/song",
  slug: "taylor-swift-this-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1183e3b3-e6c9-46b3-a38a-ebd767ee3104",
      externalLink: "https://musicbrainz.org/work/1183e3b3-e6c9-46b3-a38a-ebd767ee3104",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "This Love",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
