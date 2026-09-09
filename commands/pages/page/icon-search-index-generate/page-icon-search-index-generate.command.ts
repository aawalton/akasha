import type { Command } from "../../../command.page-type.ts"

export const pageIconSearchIndexGenerate = {
  id: "01a06862-06c8-7004-83db-2d1d50b06017",
  pageTypeSlug: "command",
  type: "command",
  slug: "page-icon-search-index-generate",
  definition: "the command building the icon search index from a lucide release, staged as bodies",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "--code-root <path>", takes: "the checkout the ids already in use are read from" },
    { said: "--stage <path>", takes: "the folder the bodies are staged in" },
  ],
  helpNotes: [
    "nothing lands here: the bodies are staged, and the script answered drafts them with `akasha change draft` and lands them with `akasha change apply`.",
    "a shard that stood before keeps the id it had, and only a shard that is new is given one.",
    "the icons are packed into shards under a budget rather than written as one file, because a body is refused past a size.",
    "the budget an entries shard is packed against leaves room for what formatting adds, and the pascal shards need none.",
    "a shard the new release no longer fills is named to be removed rather than left unimported.",
    "the staging folder remains, since the script that reads it is run afterwards.",
    "every file the script changes has to be read before the apply, and breaking the glass passes the checks rather than the reading.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The release the index is built from is stated here rather than taken as the latest.",
    },

    {
      invariantKind: "departure",
      statement: "A body rendered at or past the size a landing refuses stages nothing at all.",
    },
    {
      invariantKind: "departure",
      statement: "A shard standing that this run does not fill is named to be removed.",
    },
    {
      invariantKind: "departure",
      statement:
        "The single page anything outside imports reaches its shards by the path every shard sits at.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes under the akasha folder.",
    },
    {
      invariantKind: "gap",
      statement: "A shard that is new is written into the list the owning package's page states.",
    },
  ],
} as const satisfies Command
