import type { ChangeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const removeTypeMember = {
  id: "01a08285-9707-78cc-8925-892dca08a7a2",
  type: "page-type/change-mechanical-file-content",
  slug: "remove-type-member",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "a member taken out of an exported object type",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A member goes with the line that member sits on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The members the type keeps are left as those members were.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The type the member named loses its import in the same answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type the body names somewhere else keeps its import.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import naming other types loses that one name rather than the whole line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A member the type has none of is refused rather than passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The object type is found through the alias the change names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An alias built from an intersection is read for the object type inside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body with no such alias is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The body is answered rather than written.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here puts the imports in order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A type written on one line loses its member on that line rather than losing a line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type keeps its braces when the last member goes.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
