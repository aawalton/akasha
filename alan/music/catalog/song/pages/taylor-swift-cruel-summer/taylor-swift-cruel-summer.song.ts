import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftCruelSummer = {
  id: "019ea416-0340-7bd9-8da1-b64a24e3d1a8",
  type: "page-type/song",
  slug: "taylor-swift-cruel-summer",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0e3ae332-8ba1-4040-894f-bb1f4ef925d6",
      externalLink: "https://musicbrainz.org/work/0e3ae332-8ba1-4040-894f-bb1f4ef925d6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cruel Summer",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
