import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheBlackDog = {
  id: "019ea416-3597-7445-b8d5-95a65138af9f",
  type: "page-type/song",
  slug: "taylor-swift-the-black-dog",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "60c70525-0bcd-483a-9fd2-ff7b10cfb069",
      externalLink: "https://musicbrainz.org/work/60c70525-0bcd-483a-9fd2-ff7b10cfb069",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Black Dog",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
