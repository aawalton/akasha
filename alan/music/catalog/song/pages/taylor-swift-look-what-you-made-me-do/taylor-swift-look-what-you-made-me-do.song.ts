import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftLookWhatYouMadeMeDo = {
  id: "019ea416-2271-75ba-a645-5e0d530aebca",
  type: "page-type/song",
  slug: "taylor-swift-look-what-you-made-me-do",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "812506f3-b3fc-4c2f-b621-e50b336b1665",
      externalLink: "https://musicbrainz.org/work/812506f3-b3fc-4c2f-b621-e50b336b1665",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Look What You Made Me Do",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
