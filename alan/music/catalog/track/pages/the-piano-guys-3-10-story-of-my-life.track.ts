import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310StoryOfMyLife = {
  id: "01a0afa2-0dcc-7f3f-8bc2-1a4c699afc2c",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-story-of-my-life",
  ownLength: 4.4637,
  ownProgress: 4.4637,
  partOfCollections: ["release/the-piano-guys-3-10"],
  status: "completed",
  unit: "unit/minutes",
  title: "Story of My Life",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "storyofmylife|0jW6R8CVyVohuUJVcuweDI|267822",
  song: "song/the-piano-guys-story-of-my-life",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 2,
      position: 14,
      externalId: "2kH5Ja9CChF2jU8JJic5Pj",
      externalLink: "https://open.spotify.com/track/2kH5Ja9CChF2jU8JJic5Pj",
    },
  ],
} as const satisfies Track
