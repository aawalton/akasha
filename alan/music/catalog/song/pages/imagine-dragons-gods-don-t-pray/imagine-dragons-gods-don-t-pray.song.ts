import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsGodsDonTPray = {
  id: "019ea49b-211e-73a3-96ab-46c9ee20fdd1",
  type: "page-type/song",
  slug: "imagine-dragons-gods-don-t-pray",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "efcbf65c-9ce6-4fdd-82f3-dbe458f017d3",
      externalLink: "https://musicbrainz.org/work/efcbf65c-9ce6-4fdd-82f3-dbe458f017d3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Gods Don’t Pray",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
