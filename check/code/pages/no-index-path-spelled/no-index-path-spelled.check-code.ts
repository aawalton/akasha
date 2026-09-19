import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const noIndexPathSpelled = {
  id: "01a05350-50b5-76df-9760-b09c77c2ee7c",
  type: "page-type/check-code",
  slug: "no-index-path-spelled",
  definition: "the check refusing code outside the index folder that spells a path into the index",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the index sits is asked of `index-reading` rather than spelt here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file under the index folder is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file beside a page is judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file is judged from its own body alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every phase judges alike.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every string a body has is read rather than the specifiers alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The index folder's name counts only where it is a whole path segment.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A name the index folder's name only ends, as an `index` page's file does, is not seen.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A path built from anything but plain strings is not seen.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The use a caller makes of a path the caller was given is not judged.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 45 },
} as const satisfies CheckCode
