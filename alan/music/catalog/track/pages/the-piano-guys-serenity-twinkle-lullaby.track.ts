import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityTwinkleLullaby = {
  id: "01a0afa2-0848-73a8-987e-463c188937e7",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-twinkle-lullaby",
  ownLength: 1.8546666666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  status: "not-started",
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
} as const satisfies Track
