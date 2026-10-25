import type { Command } from "akasha/command/command.page-type.types.ts"

export const watchingHallmark = {
  id: "01a17496-2f58-737f-8788-a05468c10256",
  type: "page-type/command",
  slug: "watching-hallmark",
  definition:
    "the command shelving every Hallmark film and series under its category and its series",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The films are the ones Wikipedia lists as Hallmark's original films.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The shows are the ones TMDB says first aired on Hallmark Channel or Hallmark+.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title is matched to TMDB by its name and the year it first aired.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title TMDB holds no record of is still shelved, with no length.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A title first aired in a Christmas block or named for Christmas is a Christmas title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A title first aired on Hallmark's mystery channel or classed as mystery or crime is a mystery.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other title is a romance.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A series is a TMDB collection, a shared article, a shared name before a colon, or a sequel.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A series sits under Mystery where most of its titles that are not Christmas titles are mysteries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Any other series sits under Christmas where half its titles are Christmas titles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other series sits under Romance.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Christmas title in a series that is not a Christmas series also sits under Christmas.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A title already held keeps its status and progress, and only gains shelves and services.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every run asks TMDB again where each title streams and states what it answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call saying `--plan` reports the shelf and writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A write states the commit the pages were asked at, or the one the last write made.",
    },
  ],
  parts: [
    "module/hallmark-listing",
    "module/hallmark-matching",
    "module/hallmark-series",
    "module/hallmark-shelving",
  ],
  name: "hallmark",
  arguments: [{ argument: "argument/plan" }],
  createdAt: "2026-10-25T19:42:42.006Z",
  updatedAt: "2026-10-25T19:54:28.649Z",
} as const satisfies Command
