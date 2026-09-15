import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const noIndexPathSpelled = {
  id: "01a05350-50b5-76df-9760-b09c77c2ee7c",
  type: "check-code",
  slug: "no-index-path-spelled",
  definition:
    "the check refusing code outside the index folder that spells a path into the index",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Where the index sits is asked of `index-reading` rather than spelt here.",
    },
    {
      invariantKind: "departure",
      statement: "A file under the index folder is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A page is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside a page is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A file is judged from its own body alone.",
    },
    {
      invariantKind: "departure",
      statement: "Every phase judges alike.",
    },
    {
      invariantKind: "departure",
      statement: "Every string a body has is read rather than the specifiers alone.",
    },
    {
      invariantKind: "absence",
      statement: "A path built from anything but plain strings is not seen.",
    },
    {
      invariantKind: "absence",
      statement: "The use a caller makes of a path the caller was given is not judged.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
