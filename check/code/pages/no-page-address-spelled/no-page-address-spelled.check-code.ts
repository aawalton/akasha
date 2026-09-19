import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const noPageAddressSpelled = {
  id: "01a0a060-1c0f-7aff-bb8a-1a01821f994f",
  type: "page-type/check-code",
  slug: "no-page-address-spelled",
  definition: "the check refusing code that spells a page's address as a plain string",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An address is a page type and a slug parted by `/`, with a scope between where the type has one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A string is an address only where its opening names a page type the index files.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A string whose slug or scope is not lower kebab case is no address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A string naming no page the index lists is no address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is passed over, because a page's relations are filed by the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A generated body is passed over, because its writer follows a rename.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An uncommitted body is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file beside a page is judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test is judged as any other code is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every string a body has is read rather than the specifiers alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each spelling is named on its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every phase judges alike.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An address built from anything but one plain string is not seen.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 30 },
} as const satisfies CheckCode
