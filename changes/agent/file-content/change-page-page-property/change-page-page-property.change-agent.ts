import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const changePagePageProperty = {
  id: "01a07932-2568-7c41-8097-885a9fc34263",
  pageTypeSlug: "change-agent",
  slug: "change-page-page-property",
  changeMode: "change-mode-change",
  definition:
    "one property of one page stated anew, by the mechanical change fitting that property",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Which mechanical change fits is read from the property the key names.",
    },
    {
      invariantKind: "departure",
      statement: "A key naming a relation is handed to the mechanical change for a relation.",
    },
    {
      invariantKind: "departure",
      statement: "Every other key is handed to the mechanical change stating one key anew.",
    },
    {
      invariantKind: "departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A key with many values is refused here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The refusal for many values names the changes putting a value in and taking a value out.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
