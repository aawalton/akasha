import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftChristmasesWhenYouWereMine = {
  id: "019ea416-07fe-75aa-8a5f-72be85e2a8f7",
  type: "page-type/song",
  slug: "taylor-swift-christmases-when-you-were-mine",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "45ddf97b-03f1-42fa-8fdd-699e6fd5b131",
      externalLink: "https://musicbrainz.org/work/45ddf97b-03f1-42fa-8fdd-699e6fd5b131",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Christmases When You Were Mine",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
