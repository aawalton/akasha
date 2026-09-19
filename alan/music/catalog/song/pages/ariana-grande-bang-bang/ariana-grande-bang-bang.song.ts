import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBangBang = {
  id: "019ea4e2-8be9-7486-a136-799fb1056452",
  type: "page-type/song",
  slug: "ariana-grande-bang-bang",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a5067caf-7bf1-41ac-9564-f202659d1690",
      externalLink: "https://musicbrainz.org/work/a5067caf-7bf1-41ac-9564-f202659d1690",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bang Bang",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
