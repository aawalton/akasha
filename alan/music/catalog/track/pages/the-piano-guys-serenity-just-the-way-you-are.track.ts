import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityJustTheWayYouAre = {
  id: "01a0afa2-097f-789a-bf88-ca5196a04f52",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-just-the-way-you-are",
  ownLength: 4.370666666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1f34b8HCyxc7dNNVJC9ivJ",
      externalLink: "https://open.spotify.com/track/1f34b8HCyxc7dNNVJC9ivJ",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Just the Way You Are",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "justthewayyouare|0jW6R8CVyVohuUJVcuweDI|262240",
  song: "song/the-piano-guys-just-the-way-you-are",
} as const satisfies Track
