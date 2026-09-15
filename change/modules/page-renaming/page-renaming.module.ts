import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageRenaming = {
  id: "01a09c84-eddb-736c-81c8-abaa539ee618",
  type: "module",
  slug: "page-renaming",
  definition: "the edits renaming a page and carrying its files to where its new slug says",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page's files are moved before that page's slug is restated.",
    },
    {
      invariantKind: "departure",
      statement: "The slug is restated at the path the move lands the page at.",
    },
    {
      invariantKind: "departure",
      statement: "The keys with a file are read from the page's own type.",
    },
    {
      invariantKind: "departure",
      statement: "A key that type does not declare is looked for among every page property.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type holding a secret or an uncommitted value keeps that value beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "A file under a reserved tail is moved with the page that file sits beside.",
    },
    {
      invariantKind: "departure",
      statement: "A page owning its folder takes every file under that folder with the page.",
    },
    {
      invariantKind: "departure",
      statement: "A page in a folder named for what its slug adds keeps a folder named that way.",
    },
    {
      invariantKind: "departure",
      statement: "A page type owning its folder keeps the folder that page type has.",
    },
    {
      invariantKind: "departure",
      statement: "Every file the rename carries is carried by one call to the carrying module.",
    },
    {
      invariantKind: "departure",
      statement:
        "The modules restating an address, a slug and an export are called rather than reached.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest naming a moved file as a way in states the new path for that way.",
    },
    {
      invariantKind: "departure",
      statement: "A way whose name closes with the old slug closes with the new slug instead.",
    },
    {
      invariantKind: "departure",
      statement: "The address a page's slug names is restated wherever a body spells that address.",
    },
    {
      invariantKind: "departure",
      statement: "A call saying every address is restated already has no address restated here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a change.",
    },
    {
      invariantKind: "absence",
      statement: "No guard runs here; the change calling this names the guards.",
    },
  ],
} as const satisfies Module
