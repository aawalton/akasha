import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterWellBeTheStars = {
  id: "01a0b723-d736-77b6-a4bf-fdff9a896cb1",
  type: "page-type/song",
  slug: "sabrina-carpenter-well-be-the-stars",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "afbaa541-1f13-40da-bffe-2a689b4c2541",
      externalLink: "https://musicbrainz.org/work/afbaa541-1f13-40da-bffe-2a689b4c2541",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "We’ll Be the Stars",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
