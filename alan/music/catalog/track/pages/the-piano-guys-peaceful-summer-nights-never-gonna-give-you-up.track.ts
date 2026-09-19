import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPeacefulSummerNightsNeverGonnaGiveYouUp = {
  id: "01a0afa1-c6b6-7478-8061-0080b1b1fd34",
  type: "page-type/track",
  slug: "the-piano-guys-peaceful-summer-nights-never-gonna-give-you-up",
  ownLength: 3.04385,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-peaceful-summer-nights"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3Jru3GCiD7n2JPfQZvjXoC",
      externalLink: "https://open.spotify.com/track/3Jru3GCiD7n2JPfQZvjXoC",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Never Gonna Give You Up",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "nevergonnagiveyouup|0jW6R8CVyVohuUJVcuweDI|182631",
  song: "song/the-piano-guys-never-gonna-give-you-up",
} as const satisfies Track
