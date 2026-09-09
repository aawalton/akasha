import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const removePage = {
  id: "01a0776d-8d1e-7f93-a0e2-4c566d49f8fd",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "remove-page",
  changeMode: "change-mode-remove",
  definition: "one page taken away, by the partial change fitting the kind of page named",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The kind of page is read from the path rather than from the index.",
    },
    {
      invariantKind: "departure",
      statement: "A path the naming grammar reads as no page file is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page type is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal for a page type names the change that takes a page type away.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page that is no page type is handed to the partial change taking that kind of page away.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A page property is handed to the partial change taking a page property away.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
