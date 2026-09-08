import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const addPropertyToPageType = {
  id: "01a081e1-00ca-7879-a25f-c734368cb78a",
  pageTypeSlug: "change-agent",
  slug: "add-property-to-page-type",
  changeModeSlug: "change-mode-add",
  changeTargetTypeSlug: "change-target-type/page-type",
  changeTargetSubtypeSlug: "change-target-subtype/page-type-page-property",
  definition: "one page property declared on one page type",
  code: "ts",
  test: "ts",
  runsChecks: true,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property is declared in the page type's data and in its type in one answer.",
    },
    {
      invariantKind: "departure",
      statement: "The declaration is put in as a record rather than as the text of a record.",
    },
    {
      invariantKind: "departure",
      statement: "The property is named among the page type's parts in the same answer.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration carrying many values states a count.",
    },
    {
      invariantKind: "departure",
      statement: "A count the change is not told is stated as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration carrying one value states no count.",
    },
    {
      invariantKind: "departure",
      statement: "The key the member carries is the key the property answers to.",
    },
    {
      invariantKind: "departure",
      statement: "The type the member names is the type the property's page exports.",
    },
    {
      invariantKind: "departure",
      statement: "A member is written optional where the declaration is not required.",
    },
    {
      invariantKind: "departure",
      statement: "A property whose page sits outside the page type's folder is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A slug naming no page property is refused before any body is worked out.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming no page type is refused before any body is worked out.",
    },
    {
      invariantKind: "departure",
      statement: "Each edit is worked out over the body the edit before it left.",
    },
    {
      invariantKind: "departure",
      statement: "Putting each part in is left to the mechanical changes.",
    },
    {
      invariantKind: "gap",
      statement: "A property reached through a package alias is declared here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page of the type the property was declared on.",
    },
  ],
} as const satisfies ChangeAgent
