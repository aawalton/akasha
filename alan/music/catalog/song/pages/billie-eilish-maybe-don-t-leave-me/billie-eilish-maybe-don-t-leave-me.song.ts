import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishMaybeDonTLeaveMe = {
  id: "019ea4ac-49c6-79b8-9818-7415bbec6c50",
  type: "page-type/song",
  slug: "billie-eilish-maybe-don-t-leave-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fbeabc4d-a9f8-4ee2-8886-bd4787ca8104",
      externalLink: "https://musicbrainz.org/work/fbeabc4d-a9f8-4ee2-8886-bd4787ca8104",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Maybe Don’t Leave Me",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
