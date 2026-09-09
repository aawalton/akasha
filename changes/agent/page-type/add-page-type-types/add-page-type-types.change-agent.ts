import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const addPageTypeTypes = {
  id: "01a08841-685b-7549-a8a6-d9a63c78b069",
  pageTypeSlug: "change-agent",
  slug: "add-page-type-types",
  changeMode: "change-mode-add",
  changeTargetType: "change-target-type/page-type",
  definition: "one page type turned over to the code that writes its type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page type's own file is the one argument.",
    },
    {
      invariantKind: "departure",
      statement: "The key naming the file and the move of the type are one answer.",
    },
    {
      invariantKind: "departure",
      statement: "The file the type lands at is the `types` file beside the page type.",
    },
    {
      invariantKind: "departure",
      statement: "The type carried over is the one named for the page type's slug.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming no page is refused before any body is worked out.",
    },
    {
      invariantKind: "departure",
      statement: "A page that is no page type is refused before any body is worked out.",
    },
    {
      invariantKind: "departure",
      statement: "Each edit is worked out over the body the edit before it left.",
    },
    {
      invariantKind: "departure",
      statement: "Stating the key and moving the type are left to the mechanical changes.",
    },
    {
      invariantKind: "departure",
      statement: "A page type stating that key already is refused by the change that states it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type declaring no type of that name is refused by the change that moves it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the type the page type gains.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
