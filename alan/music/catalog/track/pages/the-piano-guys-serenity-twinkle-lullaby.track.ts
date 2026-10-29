import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityTwinkleLullaby = {
  id: "01a0afa2-0848-73a8-987e-463c188937e7",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-twinkle-lullaby",
  ownLength: 1.8546666666666667,
  ownProgress: 1.8546666666666667,
  partOfCollections: ["release/the-piano-guys-serenity"],
  status: "completed",
  unit: "unit/minutes",
  title: "Twinkle Lullaby",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "twinklelullaby|0jW6R8CVyVohuUJVcuweDI|111280",
  song: "song/the-piano-guys-twinkle-lullaby",
  carriedBy: [
    {
      release: "release/the-piano-guys-serenity",
      discNumber: 1,
      position: 1,
      externalId: "0irl0h2oBUI8MvGy3pWyvz",
      externalLink: "https://open.spotify.com/track/0irl0h2oBUI8MvGy3pWyvz",
    },
  ],
  createdAt: "2026-09-17T13:50:26.888Z",
  updatedAt: "2026-10-29T14:01:01.684Z",
  progressedAt: "2026-10-29T14:01:01.684Z",
} as const satisfies Track
