import type { CodeCheck } from "../../code-check.page-type.ts"

export const phoneNumberIsE164 = {
  id: "01a058ff-c2b0-7d9c-814a-e78f75d41f67",
  pageTypeSlug: "code-check",
  slug: "phone-number-is-e164",
  definition: "the check refusing a phone number that is not written in E.164",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: true,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Which keys a page holds a phone number under is read from the page types declaring the keys.",
    },
    {
      invariantKind: "departure",
      statement: "A page type the change itself puts under `phone-number-property` counts.",
    },
    {
      invariantKind: "departure",
      statement: "A page's value is read through the shadow of the change being judged.",
    },
    {
      invariantKind: "departure",
      statement: "A value stated as a list has each entry in the list judged.",
    },
    {
      invariantKind: "departure",
      statement: "A value that is not text is refused rather than passed over.",
    },
    {
      invariantKind: "absence",
      statement: "A page whose body will not load is passed over.",
    },
    {
      invariantKind: "absence",
      statement: "`page-matches-its-type` refuses a body that will not load.",
    },
  ],
} as const satisfies CodeCheck
