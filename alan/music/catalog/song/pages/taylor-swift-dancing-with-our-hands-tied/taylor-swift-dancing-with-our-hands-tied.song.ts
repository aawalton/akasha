import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftDancingWithOurHandsTied = {
  id: "019ea416-1236-71bf-ba84-ceed2bcd94d0",
  type: "page-type/song",
  slug: "taylor-swift-dancing-with-our-hands-tied",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b0dcd90d-817f-4798-a120-3d14fac465a7",
      externalLink: "https://musicbrainz.org/work/b0dcd90d-817f-4798-a120-3d14fac465a7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dancing With Our Hands Tied",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
