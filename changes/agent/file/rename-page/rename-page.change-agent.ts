import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const renamePage = {
  id: "01a07718-c9b6-7e8c-bc13-5927529ac249",
  pageTypeSlug: "change-agent",
  slug: "rename-page",
  changeModeSlug: "change-mode-rename",
  definition: "a page renamed and carried to where its slug says, in the data and in every name",
  code: "ts",
  test: "ts",
  runsChecks: true,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page's files are carried before that page's slug is restated.",
    },
    {
      invariantKind: "departure",
      statement: "The slug is restated at the path the carry lands the page at.",
    },
    {
      invariantKind: "departure",
      statement: "The keys holding a file are read from the page's own type.",
    },
    {
      invariantKind: "departure",
      statement: "A key that type does not declare is looked for among every page property.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest naming a carried file as a way in states the new path for that way.",
    },
    {
      invariantKind: "departure",
      statement: "A way whose name closes with the old slug closes with the new slug instead.",
    },
    {
      invariantKind: "departure",
      statement: "A body reaching the page through the old way reaches the page through the new.",
    },
    {
      invariantKind: "departure",
      statement: "A page no manifest names as a way in leaves every manifest as that manifest is.",
    },
  ],
} as const satisfies ChangeAgent
