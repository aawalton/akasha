import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysSerenityBringHimHome = {
  id: "01a0afa2-095b-7ccc-96cb-7b43a140ec61",
  type: "page-type/track",
  slug: "the-piano-guys-serenity-bring-him-home",
  ownLength: 4.2551,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-serenity"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Bring Him Home",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "bringhimhome|0jW6R8CVyVohuUJVcuweDI|255306",
  song: "song/the-piano-guys-bring-him-home",
  carriedBy: [
    {
      release: "release/the-piano-guys-serenity",
      discNumber: 1,
      position: 9,
      externalId: "0CmKXpiwghfbKSlGkpNKW0",
      externalLink: "https://open.spotify.com/track/0CmKXpiwghfbKSlGkpNKW0",
    },
  ],
} as const satisfies Track
