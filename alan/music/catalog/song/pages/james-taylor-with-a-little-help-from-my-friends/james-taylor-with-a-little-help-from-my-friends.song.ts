import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorWithALittleHelpFromMyFriends = {
  id: "01a0b72f-4f74-72f8-80bc-7250625bb5d6",
  type: "page-type/song",
  slug: "james-taylor-with-a-little-help-from-my-friends",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8388f958-0fef-30ea-a70a-f1803868ecf9",
      externalLink: "https://musicbrainz.org/work/8388f958-0fef-30ea-a70a-f1803868ecf9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "With a Little Help From My Friends",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
