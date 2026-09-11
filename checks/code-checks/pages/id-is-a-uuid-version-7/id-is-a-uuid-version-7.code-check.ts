import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const idIsAUuidVersion7 = {
  id: "01a04bcb-c6f6-726e-ad7e-718958087eb4",
  type: "code-check",
  slug: "id-is-a-uuid-version-7",
  definition:
    "the check refusing a page whose stated id is not a uuid version 7 written in lower uuid",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnWorktree: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "absence",
      statement: "A file stating no page is not judged.",
    },
    {
      invariantKind: "departure",
      statement: "An id is read from the object literal rather than from the body.",
    },
    {
      invariantKind: "absence",
      statement: "An id nested deeper in the value is another page's business.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CodeCheck
