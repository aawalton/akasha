import type { ChangeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const removeTypeMember = {
  id: "01a08285-9707-78cc-8925-892dca08a7a2",
  type: "page-type/change-mechanical-file-content",
  slug: "remove-type-member",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "one member taken out of an exported object type",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A member goes with the line that member sits on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The members the type keeps are left as those members were.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The type the member named loses its import in the same answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A type the body names somewhere else keeps its import.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An import naming other types loses that one name rather than the whole line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A member the type has none of is refused rather than passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The object type is found through the alias the change names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An alias built from an intersection is read for the object type inside it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body with no such alias is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The body is answered rather than written.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here puts the imports in order.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A type written on one line loses its member on that line rather than losing a line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A type keeps its braces when the last member goes.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
