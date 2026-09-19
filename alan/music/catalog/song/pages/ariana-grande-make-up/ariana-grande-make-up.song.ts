import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeMakeUp = {
  id: "019ea4e5-ffd7-7690-8460-00add107fead",
  type: "page-type/song",
  slug: "ariana-grande-make-up",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "74219af4-5733-4333-a751-e465dda3ffed",
      externalLink: "https://musicbrainz.org/work/74219af4-5733-4333-a751-e465dda3ffed",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "make up",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
