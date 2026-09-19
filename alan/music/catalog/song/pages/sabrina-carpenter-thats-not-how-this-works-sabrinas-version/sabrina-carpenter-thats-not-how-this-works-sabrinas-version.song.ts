import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterThatsNotHowThisWorksSabrinasVersion = {
  id: "01a0b723-d163-7910-9935-d51d5a7ce259",
  type: "page-type/song",
  slug: "sabrina-carpenter-thats-not-how-this-works-sabrinas-version",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1883f8ca-7c3c-4d63-a9ae-57113d6a2519",
      externalLink: "https://musicbrainz.org/work/1883f8ca-7c3c-4d63-a9ae-57113d6a2519",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "That’s Not How This Works (Sabrina's Version)",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
