import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysPeacefulSummerNightsOdeToJoy = {
  id: "01a0afa1-c768-7bbe-a920-20e51e7b8678",
  type: "page-type/track",
  slug: "the-piano-guys-peaceful-summer-nights-ode-to-joy",
  ownLength: 1.7685166666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-peaceful-summer-nights"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7KswbsyYRYfM53n1QipSB7",
      externalLink: "https://open.spotify.com/track/7KswbsyYRYfM53n1QipSB7",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Ode To Joy",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "odetojoy|0jW6R8CVyVohuUJVcuweDI|106111",
  song: "song/the-piano-guys-ode-to-joy",
} as const satisfies Track
