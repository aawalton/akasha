import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const addPagePropertyTypes = {
  id: "01a08d57-ed0e-73b3-b5e9-98cf066c3cc7",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "add-page-property-types",
  changeMode: "change-mode-add",
  changeTargetType: "change-target-type/page-type",
  definition: "every page property of one page type turned over to the code writing its type",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page type the properties are is the one argument.",
    },
    {
      invariantKind: "departure",
      statement: "A page type that is no page property is refused before any body is worked out.",
    },
    {
      invariantKind: "departure",
      statement: "A page type no page is of is refused rather than answered as no edit.",
    },
    {
      invariantKind: "departure",
      statement: "Every page of that page type gains the key and hands its type on.",
    },
    {
      invariantKind: "departure",
      statement: "The file the type lands at is the `types` file beside the page property.",
    },
    {
      invariantKind: "departure",
      statement: "The type carried over is the one named for the page property's slug.",
    },
    {
      invariantKind: "departure",
      statement: "One page refused refuses the whole change.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the page that drew the refusal.",
    },
    {
      invariantKind: "departure",
      statement: "Each page is reached over the edits the pages before it left.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the type a page property gains.",
    },
    {
      invariantKind: "departure",
      statement: "A folder named holds the change to the pages sitting under that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating its type already is passed over rather than stating it twice.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
