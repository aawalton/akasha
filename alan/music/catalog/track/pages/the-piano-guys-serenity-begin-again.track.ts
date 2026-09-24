import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityBeginAgain = {
  id: "01a0afa2-0938-7e6c-85df-91c2f3bad280",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-begin-again",
  ownLength: 4.1331,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Begin Again",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "beginagain|0jW6R8CVyVohuUJVcuweDI|247986",
  song: "song/taylor-swift-begin-again",
  carriedBy: [
    {
      release: "release/the-piano-guys-serenity",
      discNumber: 1,
      position: 8,
      externalId: "4ADYtCeB7Fi4OLQ3bFLpHg",
      externalLink: "https://open.spotify.com/track/4ADYtCeB7Fi4OLQ3bFLpHg",
    },
  ],
} as const satisfies Track
