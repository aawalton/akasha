import type { Module } from "@akasha/code-system/module"

export const pageCalling = {
  id: "01a05e09-12dc-7b16-9bed-9d7b314f2d15",
  pageTypeSlug: "module",
  slug: "page-calling",
  definition: "the pages asked for and written over HTTP by whoever is not the workstation",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A caller reaches the pages through this module rather than through a store of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The shapes sent and answered are the service's own types rather than copies.",
    },
    {
      invariantKind: "departure",
      statement: "A question names its page type as `pageTypeSlug`.",
    },
    {
      invariantKind: "departure",
      statement: "A write hands over values under `pages` rather than a path and a body.",
    },
    {
      invariantKind: "departure",
      statement: "The origin is read from the environment before anything else.",
    },
    {
      invariantKind: "departure",
      statement: "A browser reaches the service under its own origin.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may put its own fetcher in place of the global one.",
    },
    {
      invariantKind: "departure",
      statement: "A call that answers nothing is tried again.",
    },
    {
      invariantKind: "departure",
      statement: "A call the service refuses for its own reasons is not tried again.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal the service states is carried into the reason given back.",
    },
    {
      invariantKind: "departure",
      statement: "A reason names how many attempts were spent and where those attempts went.",
    },
    {
      invariantKind: "departure",
      statement: "An answer whose shape is not the one asked for is refused rather than read on.",
    },
    {
      invariantKind: "departure",
      statement: "A page type's shape is asked for through this module.",
    },
    {
      invariantKind: "departure",
      statement: "A shape answered as no page type is refused rather than read on.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a page's file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what a page type declares.",
    },
  ],
} as const satisfies Module
