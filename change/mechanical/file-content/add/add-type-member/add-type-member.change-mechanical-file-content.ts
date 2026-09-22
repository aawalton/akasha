import type { ChangeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const addTypeMember = {
  id: "01a081dc-0cef-7d5a-9c4e-daf2ba343c98",
  type: "page-type/change-mechanical-file-content",
  slug: "add-type-member",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-code",
  definition: "a member put into an exported object type",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A member is put after the members the type already has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A member takes the indent the member above it carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The type a member names is imported in the same answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name the body imports from the path stated is not imported a second time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name the body imports from another path is refused rather than bound to that path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A member is written optional where the change is told the member is optional.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A member the type has already is refused rather than carried twice.",
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
      decisionKind: "decision-kind/constraint",
      statement: "A key no page spells is refused before any body is composed.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A type name no import holds is refused before any body is composed.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A type named from an empty path is refused.",
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
        "A type written on one line gains its member on that line rather than on a line of its own.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
