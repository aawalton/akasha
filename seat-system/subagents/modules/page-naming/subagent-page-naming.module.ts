import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const subagentPageNaming = {
  id: "01a095ed-9005-70e5-8d03-654f10141de7",
  type: "module",
  slug: "subagent-page-naming",
  definition: "the slug and path a subagent's page is named by, and the seat a slug is under",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A slug joins the name of the seat to the id the subagent runs under.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run of hyphens between the seat's name and the subagent's own id is written as one.",
    },
    {
      invariantKind: "departure",
      statement: "An agent id joins the seat's id to the id the subagent runs under.",
    },
    {
      invariantKind: "departure",
      statement: "An agent id keeps a mark a slug would collapse.",
    },
    {
      invariantKind: "departure",
      statement: "A page sits in a folder of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A page's folder is named for the subagent.",
    },
    {
      invariantKind: "departure",
      statement: "A page's files sit in the page's folder.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "A subagent whose page is already flat keeps that page rather than taking a second.",
    },
    {
      invariantKind: "departure",
      statement: "Where those pages sit is asked of the composing rather than written out here.",
    },
    {
      invariantKind: "departure",
      statement:
        "That folder is read from the checkout this code is in rather than from the root handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A root handed in says only whether a page is already there at the flat path.",
    },
    {
      invariantKind: "departure",
      statement: "A seat is named here only by a page the index files as a seat of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The pages under a seat are asked of the index rather than listed off a folder.",
    },
    {
      invariantKind: "departure",
      statement: "A page is under the longest seat name the index files that its slug opens with.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose name opens another seat's name is under no page of that other seat.",
    },
    {
      invariantKind: "departure",
      statement: "A seat the index files no name for is under every slug that opens with its name.",
    },
    {
      invariantKind: "gap",
      statement: "A seat named by nothing is under every slug that opens with a hyphen.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes a page away, writes one, or lands anything.",
    },
  ],
} as const satisfies Module
