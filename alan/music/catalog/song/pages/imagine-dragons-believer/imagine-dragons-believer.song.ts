import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsBeliever = {
  id: "019ea497-adcd-71b1-9d6d-fcfa4c3e6450",
  type: "page-type/song",
  slug: "imagine-dragons-believer",
  rank: "A+",
  tags: ["pain"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "404183d4-8f3c-4931-872a-d4c8374a30d4",
      externalLink: "https://musicbrainz.org/work/404183d4-8f3c-4931-872a-d4c8374a30d4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Believer",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  singability: "A+",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
