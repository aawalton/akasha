import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicArtistList = {
  id: "01a09b87-8def-7c15-a542-ef8c973a057d",
  type: "page-type/command",
  slug: "music-artist-list",
  definition:
    "the command listing the artists Alan keeps, what he graded each and his progress through each",
  code: "ts",
  test: "ts",
  maxWallSeconds: 300,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "How far through an artist Alan is, is read off that artist's own totals.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here adds a length up over the pages an artist holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An artist naming no release is listed, and adds to no total.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A release reaches its artist whether or not it names that artist's page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The totals are over the artists listed rather than over every artist.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A status no collection states is refused before any page is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every artist is listed where no status is asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rungs counted are the rungs the artists listed reach.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Artists are listed by how long each one runs, longest first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade said here wears the color its rung is given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The color a rung wears is read off the page stating the ladder.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No color is written where the answer is not going to a terminal.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No color is written into the JSON answer.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches a music provider.",
    },
  ],
  name: "artist-list",
  arguments: [{ argument: "argument/json" }, { argument: "argument/collection-status" }],
} as const satisfies Command
