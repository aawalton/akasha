import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBeautifulGhosts = {
  id: "019ea416-0afc-7e6f-8822-0f873c473629",
  type: "page-type/song",
  slug: "taylor-swift-beautiful-ghosts",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "72a6f2e5-fd51-4aa1-8db8-ca01465d5a5f",
      externalLink: "https://musicbrainz.org/work/72a6f2e5-fd51-4aa1-8db8-ca01465d5a5f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Beautiful Ghosts",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
