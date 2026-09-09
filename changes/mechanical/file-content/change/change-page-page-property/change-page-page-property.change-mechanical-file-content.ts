import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.ts"

export const changePagePageProperty = {
  id: "01a07716-76a6-7428-9e18-f3fc32d18085",
  pageTypeSlug: "change-mechanical-file-content",
  type: "change-mechanical-file-content",
  slug: "change-page-page-property",
  changeMode: "change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value-prose",
  definition: "one key of a page's exported object stated anew",
  code: "ts",
  test: "ts",
  guards: ["change-guard/identity-not-already-held", "change-guard/slug-names-one-property"],
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
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
