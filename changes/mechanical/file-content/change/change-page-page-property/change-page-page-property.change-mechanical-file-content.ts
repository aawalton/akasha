import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const changePagePageProperty = {
  id: "01a07716-76a6-7428-9e18-f3fc32d18085",
  pageTypeSlug: "change-mechanical-file-content",
  slug: "change-page-page-property",
  changeModeSlug: "change-mode-change",
  changeTargetTypeSlug: "change-target-type/file-content",
  changeTargetSubtypeSlug: "change-target-subtype/file-content-page-property-value-prose",
  definition: "one key of a page's exported object stated anew",
  code: "ts",
  test: "ts",
  guardSlugs: ["change-guard/identity-not-already-held"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The passage answered is the lines the key's value sits on rather than the body.",
    },
    {
      invariantKind: "departure",
      statement:
        "The id and the slug the page states after the change are judged by the guard this change names.",
    },
    {
      "invariantKind": "departure",
      "statement":
        "A newline ending the value asked for is dropped, because a page states a value rather than a body.",
    },
  ],
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
} as const satisfies ChangeMechanicalFileContent
