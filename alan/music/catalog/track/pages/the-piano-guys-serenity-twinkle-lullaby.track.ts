import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityTwinkleLullaby = {
  id: "01a0afa2-0848-73a8-987e-463c188937e7",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-twinkle-lullaby",
  ownLength: 1.8546666666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0irl0h2oBUI8MvGy3pWyvz",
      externalLink: "https://open.spotify.com/track/0irl0h2oBUI8MvGy3pWyvz",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Twinkle Lullaby",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "twinklelullaby|0jW6R8CVyVohuUJVcuweDI|111280",
  song: "song/the-piano-guys-twinkle-lullaby",
} as const satisfies Track
