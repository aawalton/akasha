import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const phoneNumberIsE164 = {
  id: "01a058ff-c2b0-7d9c-814a-e78f75d41f67",
  type: "page-type/check-code",
  slug: "phone-number-is-e164",
  definition: "the check refusing a phone number that is not written in E.164",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which keys a page has a phone number under is read from the page types declaring the keys.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The page types that can carry a phone number are read from `phone-number-property` down.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type the change itself puts under `phone-number-property` counts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's type is read from its file name rather than from its body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page whose type carries no phone number is never opened.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's value is read through the shadow of the change being judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value stated as a list has each entry in the list judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value that is not text is refused rather than passed over.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A page whose body will not load is passed over.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "`page-matches-its-type` refuses a body that will not load.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
