import type { Check } from "../check.page-type.ts"

export const idIsAUuidVersion7 = {
  id: "01a04bcb-c6f6-726e-ad7e-718958087eb4",
  pageTypeSlug: "check",
  slug: "id-is-a-uuid-version-7",
  definition:
    "the check refusing a page whose stated id is not a uuid version 7 written in lower uuid",
  code: "ts",
  test: "ts",
  runsOn: ["patch", "worktree", "deploy"],
  design: [
    {
      invariantKind: "departure",
      statement: "The id judged is the one the page states.",
    },
    {
      invariantKind: "absence",
      statement: "A file stating no page is not judged.",
    },
    {
      invariantKind: "departure",
      statement: "An id is read from the object literal, never from the body.",
    },
    {
      invariantKind: "departure",
      statement:
        "The id judged is a property of the page itself, so an id nested deeper is another page's business.",
    },
  ],
} as const satisfies Check
