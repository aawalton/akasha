import type { Command } from "@akasha/command-system/command"

export const pageIconSearchIndexGenerate = {
  id: "01a06862-06c8-7004-83db-2d1d50b06017",
  pageTypeSlug: "command",
  slug: "page-icon-search-index-generate",
  definition:
    "the command building the icon search index from a lucide release and staging the bodies that would land it",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--code-root <path>", takes: "the checkout the ids already in use are read from" },
    { said: "--stage <path>", takes: "the folder the bodies are staged in" },
  ],
  helpNotes: [
    "nothing lands here: the bodies are staged and the `akasha write` call that lands them is answered.",
    "a shard that stood before keeps the id it had, and only a shard that is new is given one.",
    "the icons are packed into shards under a budget rather than written as one file, because a body is refused past a size.",
    "the budget an entries shard is packed against leaves room for what formatting adds, and the pascal shards need none.",
    "a shard the new release no longer fills is named to be removed rather than left unimported.",
    "the staging folder is left standing, since the write that reads it is made afterwards.",
    "a page already standing has to be read before the write, or the write breaks the glass.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The release the index is built from is stated here rather than taken as the latest.",
    },
    {
      invariantKind: "departure",
      statement: "A shard already standing keeps the identity it had.",
    },
    {
      invariantKind: "departure",
      statement: "A shard holds at least one icon however long that icon's line is.",
    },
    {
      invariantKind: "departure",
      statement: "One icon whose line alone runs past the budget is refused rather than divided.",
    },
    {
      invariantKind: "departure",
      statement: "A body rendered at or past the size a write refuses stages nothing at all.",
    },
    {
      invariantKind: "departure",
      statement: "A shard standing that this run does not fill is named to be removed.",
    },
    {
      invariantKind: "departure",
      statement:
        "The one page anything outside imports reaches its shards by the path each stands at.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes under the akasha folder.",
    },
    {
      invariantKind: "gap",
      statement: "The list of shards the owning package's page states is written by this run.",
    },
  ],
} as const satisfies Command
