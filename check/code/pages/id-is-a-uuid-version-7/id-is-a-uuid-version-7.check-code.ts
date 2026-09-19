import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const idIsAUuidVersion7 = {
  id: "01a04bcb-c6f6-726e-ad7e-718958087eb4",
  type: "page-type/check-code",
  slug: "id-is-a-uuid-version-7",
  definition:
    "the check refusing a page whose stated id is not a uuid version 7 written in lower uuid",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "A file stating no page is not judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An id is read from the object literal rather than from the body.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An id nested deeper in the value is another page's business.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 60 },
} as const satisfies CheckCode
