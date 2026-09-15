import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageCalling = {
  id: "01a05e09-12dc-7b16-9bed-9d7b314f2d15",
  type: "module",
  slug: "page-calling",
  definition: "the pages asked for and written over HTTP by whoever is not the workstation",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A caller reaches the pages through this module rather than through a store of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The shapes sent and answered are the service's own types rather than copies.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A question names its page type as `pageTypeSlug`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write hands over values under `pages` rather than a path and a body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The origin is read from the environment before anything else.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A browser reaches the service under its own origin.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may put its own fetcher in place of the global fetcher.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call that answers nothing is tried again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call the service refuses for its own reasons is not tried again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal the service states is carried into the reason given back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reason names how many attempts were spent and where those attempts went.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An answer whose shape is not the shape asked for is refused rather than read on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body that will not read as JSON is refused rather than answered as nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal over a body that will not read has the parser's message.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal over a body that will not read names how many bytes came back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body that will not read as JSON is not tried again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type's shape is asked for through this module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's file is asked for through this module as a question is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file answered well is taken as bytes rather than read as JSON.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file answered badly is read as JSON to find the reason.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file the service refuses for its own reasons is not asked for again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A shape answered as no page type is refused rather than read on.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here opens a page's file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows the properties a page type declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The waiting between attempts outlasts the pages system service starting again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write may keep values outside the commit beside a path.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here appends to a page's file part, though the service answers appends.",
    },
  ],
} as const satisfies Module
