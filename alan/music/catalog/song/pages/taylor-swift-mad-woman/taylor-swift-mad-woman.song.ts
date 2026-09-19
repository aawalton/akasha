import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftMadWoman = {
  id: "019ea416-1f14-7a76-8617-99dab6a0b8ac",
  type: "page-type/song",
  slug: "taylor-swift-mad-woman",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5b7221b2-303e-468d-a1f0-32fbb0b04bac",
      externalLink: "https://musicbrainz.org/work/5b7221b2-303e-468d-a1f0-32fbb0b04bac",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "mad woman",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
