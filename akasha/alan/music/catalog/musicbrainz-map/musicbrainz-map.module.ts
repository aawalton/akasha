import type { Module } from "@akasha/code-system/module"

export const musicbrainzMap = {
  id: "01a06262-ff4c-7002-9c61-e7ce9273581d",
  pageTypeSlug: "module",
  slug: "musicbrainz-map",
  definition: "a MusicBrainz answer read as the fields a song or an artist carries",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A hit whose name is the query exactly wins over a hit scored higher.",
    },
    {
      invariantKind: "departure",
      statement: "The higher score wins among hits alike on exactness.",
    },
    {
      invariantKind: "departure",
      statement: "An artist carries the eight genres MusicBrainz counted most.",
    },
    {
      invariantKind: "departure",
      statement: "A work MusicBrainz gives no type is a song.",
    },
    {
      invariantKind: "departure",
      statement: "Whoever MusicBrainz names writer of a work wrote the work.",
    },
    {
      invariantKind: "departure",
      statement: "Whoever MusicBrainz names composer of a work wrote the work.",
    },
    {
      invariantKind: "departure",
      statement: "Whoever MusicBrainz names lyricist of a work wrote the work.",
    },
    {
      invariantKind: "departure",
      statement: "A work naming the artist as its only writer is written `solo`.",
    },
    {
      invariantKind: "departure",
      statement: "A work naming the artist among several writers is written `collab`.",
    },
    {
      invariantKind: "departure",
      statement: "A work naming the artist as no writer of the work is derivative.",
    },
    {
      invariantKind: "departure",
      statement: "A work made from another work is derivative.",
    },
    {
      invariantKind: "departure",
      statement: "A work performed by the artist is one a recording of theirs points at.",
    },
    {
      invariantKind: "departure",
      statement: "Recordings sharing a normalised title are one song.",
    },
    {
      invariantKind: "departure",
      statement: "The kept recording of a title is the one with the lowest MusicBrainz id.",
    },
    {
      invariantKind: "departure",
      statement: "A recording with no title is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A recording whose title brackets a word like `remix` or `live` is derivative.",
    },
    {
      invariantKind: "departure",
      statement: "A song derived from a recording is performed.",
    },
    {
      invariantKind: "departure",
      statement: "An artist's title is the name MusicBrainz gave.",
    },
    {
      invariantKind: "departure",
      statement: "A song's title from a work is the work's title.",
    },
    {
      invariantKind: "departure",
      statement: "A song's title from a recording is the recording's title.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the network.",
    },
  ],
} as const satisfies Module
