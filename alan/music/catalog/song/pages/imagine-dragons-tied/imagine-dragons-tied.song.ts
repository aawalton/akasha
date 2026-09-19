import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsTied = {
  id: "019ea49d-2356-7f34-8fb0-7293844eed79",
  type: "page-type/song",
  slug: "imagine-dragons-tied",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f0a1dd2f-7449-45f7-a04c-518e6d279249",
      externalLink: "https://musicbrainz.org/work/f0a1dd2f-7449-45f7-a04c-518e6d279249",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Tied",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
