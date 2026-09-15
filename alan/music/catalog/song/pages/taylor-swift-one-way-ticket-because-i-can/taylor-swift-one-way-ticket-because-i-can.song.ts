import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftOneWayTicketBecauseICan = {
  id: "019ea416-304d-7a6b-b3b8-2989cc393d69",
  type: "song",
  slug: "taylor-swift-one-way-ticket-because-i-can",
  title: "One Way Ticket (Because I Can)",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2f3730ea-39e4-49d1-ad76-5b64168eda14",
      externalLink: "https://musicbrainz.org/work/2f3730ea-39e4-49d1-ad76-5b64168eda14",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
} as const satisfies Song
