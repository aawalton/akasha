import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftThankYouAimee = {
  id: "019ea416-32b7-7686-9ef8-f0d090dfd3c7",
  type: "page-type/song",
  slug: "taylor-swift-thank-you-aimee",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4a5634f2-ca0b-479d-a58b-4b9f0ec2da54",
      externalLink: "https://musicbrainz.org/work/4a5634f2-ca0b-479d-a58b-4b9f0ec2da54",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "thanK you aIMee",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
