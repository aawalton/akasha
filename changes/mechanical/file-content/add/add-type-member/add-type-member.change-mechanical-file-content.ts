import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const addTypeMember = {
  id: "01a081dc-0cef-7d5a-9c4e-daf2ba343c98",
  pageTypeSlug: "change-mechanical-file-content",
  type: "change-mechanical-file-content",
  slug: "add-type-member",
  changeMode: "change-mode-add",
  changeTargetType: "change-target-type/file-content",
  definition: "one member put into an exported object type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A member is put after the members the type already has.",
    },
    {
      invariantKind: "departure",
      statement: "A member takes the indent the member above it carries.",
    },
    {
      invariantKind: "departure",
      statement: "The type a member names is imported in the same answer.",
    },
    {
      invariantKind: "departure",
      statement: "A name the body imports already is not imported a second time.",
    },
    {
      invariantKind: "departure",
      statement: "A member is written optional where the change is told the member is optional.",
    },
    {
      invariantKind: "departure",
      statement: "A member the type has already is refused rather than carried twice.",
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
        "A type written on one line gains its member on that line rather than on a line of its own.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
