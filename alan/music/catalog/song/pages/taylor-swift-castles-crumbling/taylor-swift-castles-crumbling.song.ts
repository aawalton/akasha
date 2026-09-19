import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftCastlesCrumbling = {
  id: "019ea416-1573-76b4-a851-0465c6812d53",
  type: "page-type/song",
  slug: "taylor-swift-castles-crumbling",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cbae50c2-21a3-43aa-8979-b5603a989619",
      externalLink: "https://musicbrainz.org/work/cbae50c2-21a3-43aa-8979-b5603a989619",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Castles Crumbling",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
