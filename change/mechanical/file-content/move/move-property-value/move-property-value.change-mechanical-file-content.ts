import type { ChangeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const movePropertyValue = {
  id: "01a081e2-edda-7fdd-bb18-0b5905ce5680",
  type: "page-type/change-mechanical-file-content",
  slug: "move-property-value",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "one value moved to another place in the list one page property holds",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A place is counted from `1`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The value at the place moved from sits at the place moved to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The values that value passed close the gap that value left.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The values keep the order those values were in among themselves.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The characters between one value and the next stay where those characters sit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value is moved whether that value is text or a record.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The value moved is named by its place or by the text a field of that value states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value named by a field is found in the body this change is reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The place moved to is named by a place or by the value already holding that place.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value moved onto another takes the place that other value holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value moved onto an earlier value sits before that value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value moved onto a later value sits after that value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A move onto a value the body no longer holds is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Text no record states under that field is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Text more than one record states under that field is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key the page states nothing under is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key holding one value is refused rather than made a list.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A place no value sits at is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A place that is no whole number is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A move onto the place the value sits at already is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The passage answered is the lines the list sits on rather than the body.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Every character written here is taken from the body already there.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page is taken away here.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
