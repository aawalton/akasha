import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const addPropertyRecord = {
  id: "01a081e6-5170-7f4a-b5df-d0846398305f",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "add-property-record",
  changeMode: "change-mode-add",
  definition: "one record put into one page property, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Putting the record in is left to the mechanical change of the same name.",
    },
    {
      invariantKind: "departure",
      statement: "`after` is handed on where the caller states `after`.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where the caller states no `after`, the key the page's own type puts this one after is handed on.",
    },
    {
      invariantKind: "departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "absence",
      statement: "No record put in is resolved.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "departure",
      statement: "`after` is left out where the pages of this page's type write the key nowhere.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
