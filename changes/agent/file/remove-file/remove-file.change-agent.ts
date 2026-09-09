import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const removeFile = {
  id: "01a07991-8989-7000-8e13-06e6791ebefb",
  pageTypeSlug: "change-agent",
  slug: "remove-file",
  changeMode: "change-mode-remove",
  definition: "one file taken away, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page file is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal for a page file names the change that takes a page away.",
    },
    {
      invariantKind: "departure",
      statement: "A page file is read from the path against the page types the index has.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming a page type that is no page type is no page file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path that is no page file is handed to the change taking that kind of path away.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "absence",
      statement: "No file beside the path is taken away here.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
