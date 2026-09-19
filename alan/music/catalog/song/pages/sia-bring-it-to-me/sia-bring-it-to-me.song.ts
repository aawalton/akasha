import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBringItToMe = {
  id: "019ea4c5-3501-7eee-a686-eee260559d7f",
  type: "page-type/song",
  slug: "sia-bring-it-to-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a306a0b6-e360-4a2b-99da-553e04b2bcc4",
      externalLink: "https://musicbrainz.org/work/a306a0b6-e360-4a2b-99da-553e04b2bcc4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bring It to Me",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  written: "solo",
} as const satisfies Song
