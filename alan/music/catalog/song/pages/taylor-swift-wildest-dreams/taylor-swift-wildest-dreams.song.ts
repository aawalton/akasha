import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftWildestDreams = {
  id: "019ea416-4352-7c35-9511-fa84cfde4400",
  type: "page-type/song",
  slug: "taylor-swift-wildest-dreams",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "17567c60-83d9-4fa8-bd79-484ecfed8a26",
      externalLink: "https://musicbrainz.org/work/17567c60-83d9-4fa8-bd79-484ecfed8a26",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wildest Dreams",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
