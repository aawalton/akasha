import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const domainIsAPartOfADomain = {
  id: "01a0d945-b6f1-721d-8e3b-baac8c6c0522",
  type: "page-type/check-code",
  slug: "domain-is-a-part-of-a-domain",
  definition: "the check refusing a domain no domain names among its parts",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page whose page type is under `domain` is judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`domain/akasha` alone is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page named only by pages outside `domain` is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A domain the change has is judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every part a page the change has named before the change is judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which pages name a domain is read from the index as the change leaves the index.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "How many pages name a domain, and whether its parents loop, is not judged here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A page type leaving `domain` does not have the parts its pages name judged at change.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
