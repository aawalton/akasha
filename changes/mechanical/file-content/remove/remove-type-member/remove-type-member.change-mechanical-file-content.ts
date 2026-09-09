import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const removeTypeMember = {
  id: "01a08285-9707-78cc-8925-892dca08a7a2",
  pageTypeSlug: "change-mechanical-file-content",
  type: "change-mechanical-file-content",
  slug: "remove-type-member",
  changeMode: "change-mode-remove",
  changeTargetType: "change-target-type/file-content",
  definition: "one member taken out of an exported object type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A member goes with the line that member sits on.",
    },
    {
      invariantKind: "departure",
      statement: "The members the type keeps are left as those members were.",
    },
    {
      invariantKind: "departure",
      statement: "The type the member named loses its import in the same answer.",
    },
    {
      invariantKind: "departure",
      statement: "A type the body names somewhere else keeps its import.",
    },
    {
      invariantKind: "departure",
      statement: "An import naming other types loses that one name rather than the whole line.",
    },
    {
      invariantKind: "departure",
      statement: "A member the type has none of is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "The object type is found through the alias the change names.",
    },
    {
      invariantKind: "departure",
      statement: "An alias built from an intersection is read for the object type inside it.",
    },
    {
      invariantKind: "departure",
      statement: "A body with no such alias is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The body is answered rather than written.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here puts the imports in order, the landing formatting the body.",
    },
    {
      invariantKind: "departure",
      statement:
        "A type written on one line loses its member on that line rather than losing a line.",
    },
    {
      invariantKind: "departure",
      statement: "A type keeps its braces when the last member goes.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
