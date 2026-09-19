import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysClassicalForStudyingNeverGonnaGiveYouUp = {
  id: "01a0afa1-c952-7234-9f94-07a1e65ec2ea",
  type: "page-type/track",
  slug: "the-piano-guys-classical-for-studying-never-gonna-give-you-up",
  ownLength: 3.04385,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-classical-for-studying"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0V2tTn2sKjxbbzmcr7RJio",
      externalLink: "https://open.spotify.com/track/0V2tTn2sKjxbbzmcr7RJio",
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
