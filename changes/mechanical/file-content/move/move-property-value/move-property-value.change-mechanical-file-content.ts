import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const movePropertyValue = {
  id: "01a081e2-edda-7fdd-bb18-0b5905ce5680",
  pageTypeSlug: "change-mechanical-file-content",
  type: "change-mechanical-file-content",
  slug: "move-property-value",
  changeMode: "change-mode-move",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "one value moved to another place in the list one page property holds",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A place is counted from one.",
    },
    {
      invariantKind: "departure",
      statement: "The value at the place moved from sits at the place moved to.",
    },
    {
      invariantKind: "departure",
      statement: "The values that value passed close the gap that value left.",
    },
    {
      invariantKind: "departure",
      statement: "The values keep the order they were in among themselves.",
    },
    {
      invariantKind: "departure",
      statement: "The characters between one value and the next stay where they sit.",
    },
    {
      invariantKind: "departure",
      statement: "A value is moved whether that value is text or a record.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page states nothing under is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A key holding one value is refused rather than made a list.",
    },
    {
      invariantKind: "departure",
      statement: "A place no value sits at is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A place that is no whole number is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A move onto the place the value sits at already is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The passage answered is the lines the list sits on rather than the body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement:
        "Every character written here is taken from the body already there, so no value arrives.",
    },
    {
      invariantKind: "absence",
      statement:
        "No page is taken away here, so a guard reading what an answer takes away reads nothing.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
