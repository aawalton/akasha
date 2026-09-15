import type { ChangeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const changePagePageProperty = {
  id: "01a07716-76a6-7428-9e18-f3fc32d18085",
  type: "change-mechanical-file-content",
  slug: "change-page-page-property",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "one key of a page's exported object stated anew",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  guards: [
    "change-guard/identity-not-already-held",
    "change-guard/slug-names-one-property",
    "change-guard/relation-reaches-a-page",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The passage answered is the lines the key's value sits on rather than the body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The id and the slug the page states after the change are judged by the guard this change names.",
    },
    {
      "invariantKind": "invariant-kind/departure",
      "statement": "A newline ending the value asked for is dropped.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
