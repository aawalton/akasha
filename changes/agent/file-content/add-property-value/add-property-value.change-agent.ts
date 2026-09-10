import type { ChangeAgent } from "../../change-agent.page-type.types.ts"

export const addPropertyValue = {
  id: "01a07944-9edf-70c7-8101-db279ee5ea45",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "add-property-value",
  changeMode: "change-mode-add",
  definition: "one value put into one page property, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key naming a relation has its value resolved before any body is worked out.",
    },
    {
      invariantKind: "departure",
      statement: "A value naming no page is refused where the key names a relation.",
    },
    {
      invariantKind: "departure",
      statement: "A key naming no relation takes its value unresolved.",
    },
    {
      invariantKind: "departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Putting the value in is left to the mechanical change of the same name.",
    },
    {
      invariantKind: "departure",
      statement: "`after` is handed on where the caller states `after`.",
    },
    {
      invariantKind: "departure",
      statement: "`after` is left out where the caller states no `after`.",
    },
    {
      invariantKind: "departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "departure",
      statement: "Whether the property has one value is read from the type the page states.",
    },
    {
      invariantKind: "departure",
      statement: "A key the type names under no property is handed on as carrying many values.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
