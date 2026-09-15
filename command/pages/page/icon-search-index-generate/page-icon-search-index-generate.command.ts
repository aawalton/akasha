import type { Command } from "akasha/command/command.page-type.types.ts"

export const pageIconSearchIndexGenerate = {
  id: "01a06862-06c8-7004-83db-2d1d50b06017",
  type: "page-type/command",
  slug: "page-icon-search-index-generate",
  definition: "the command building the icon search index from a lucide release, staged as bodies",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The release the index is built from is stated here rather than taken as the latest.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run stages the bodies and answers a script that drafts and lands them.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shard already there keeps the id that shard had.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a shard that is new is given an id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The icons are packed into shards under a byte budget rather than into one body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The staging folder remains after a run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The staging folder is the first thing a refusal part way names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that throws part way names every shard already whole in the stage.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shard only half written is named nowhere, because half a shard cannot land.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every file the answered script changes is read before that script is run.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "A body rendered at or past the size a landing refuses stages nothing at all.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shard standing that this run does not fill is named to be removed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The single page anything outside imports reaches its shards by the path every shard sits at.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes under the akasha folder.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A shard that is new is written into the list the owning package's page states.",
    },
  ],
  name: "icon-search-index-generate",
  arguments: [{ argument: "argument/code-root" }, { argument: "argument/stage" }],
} as const satisfies Command
