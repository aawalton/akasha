import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mortalSparing = {
  id: "01a090fe-a88f-7766-88f5-4ef36edcf941",
  type: "module",
  slug: "mortal-sparing",
  definition: "the refusals a change draws over a mortal page, less the ones already drawn there",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal a mortal page already drew is no refusal the change leaves.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal a change draws anew over a mortal page refuses that change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A refusal over a page that is not mortal refuses the change however old that refusal is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file is mortal where the page type its own name says is mortal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "What a page already drew is read by running the check again over the bodies before the change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check drawing no refusal over a mortal page runs once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The bodies before the change are a change of their own that moves nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page the change writes anew has no body before it, so that page drew nothing.",
    },
  ],
} as const satisfies Module
