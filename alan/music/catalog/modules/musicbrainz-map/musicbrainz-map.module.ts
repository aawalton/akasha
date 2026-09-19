import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const musicbrainzMap = {
  id: "01a06262-ff4c-7002-9c61-e7ce9273581d",
  type: "page-type/module",
  slug: "musicbrainz-map",
  definition: "a MusicBrainz answer read as the fields a song or an artist carries",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A hit whose name is the query exactly wins over a hit scored higher.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The higher score wins among hits alike on exactness.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An artist carries the eight genres MusicBrainz counted most.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A work MusicBrainz gives no type is a song.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The person MusicBrainz names writer of a work wrote the work.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The person MusicBrainz names composer of a work wrote the work.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The person MusicBrainz names lyricist of a work wrote the work.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A work naming the artist as its only writer is written `solo`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A work naming the artist among several writers is written `collab`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A work naming the artist as no writer of the work states no song type.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Naming no writer of a work is no record that another wrote the work.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A work made from another work is derivative whoever is named writer of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A work performed by the artist is a work a recording of the artist's points at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Recordings sharing a normalised title are one song.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The kept recording of a title is the recording with the lowest MusicBrainz id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recording with no title is dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recording whose title brackets a word like `remix` or `live` is derivative.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A song derived from a recording is performed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An artist's title is the name MusicBrainz gave.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A song's title from a work is the work's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A song's title from a recording is the recording's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A song names the artist whose song it is as an address.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the network.",
    },
  ],
} as const satisfies Module
