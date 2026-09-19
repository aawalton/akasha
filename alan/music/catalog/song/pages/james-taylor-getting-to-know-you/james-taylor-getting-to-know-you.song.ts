import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorGettingToKnowYou = {
  id: "01a0b72f-21a7-7084-8dcf-aa21fccc851d",
  type: "page-type/song",
  slug: "james-taylor-getting-to-know-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "206695ff-412a-340c-8d74-8751fa6cabfb",
      externalLink: "https://musicbrainz.org/work/206695ff-412a-340c-8d74-8751fa6cabfb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Getting to Know You",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
