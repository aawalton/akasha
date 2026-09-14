import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const noPageAddressSpelled = {
  id: "01a0a060-1c0f-7aff-bb8a-1a01821f994f",
  type: "code-check",
  slug: "no-page-address-spelled",
  definition: "the check refusing code that spells a page's address as a plain string",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An address is a page type and a slug parted by `/`, with a scope between where the type has one.",
    },
    {
      invariantKind: "departure",
      statement: "A string is an address only where its opening names a page type the index files.",
    },
    {
      invariantKind: "departure",
      statement: "A string whose slug or scope is not lower kebab case is no address.",
    },
    {
      invariantKind: "departure",
      statement: "Whether the address names a page that is there is not judged.",
    },
    {
      invariantKind: "departure",
      statement: "A page is passed over, because a page's relations are filed by the index.",
    },
    {
      invariantKind: "departure",
      statement: "A generated body is passed over, because its writer follows a rename.",
    },
    {
      invariantKind: "departure",
      statement: "An uncommitted body is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside a page is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A test is judged as any other code is.",
    },
    {
      invariantKind: "departure",
      statement: "Every string a body has is read rather than the specifiers alone.",
    },
    {
      invariantKind: "departure",
      statement: "Each spelling is named on its own.",
    },
    {
      invariantKind: "departure",
      statement: "Every phase judges alike.",
    },
    {
      invariantKind: "absence",
      statement: "An address built from anything but one plain string is not seen.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 30 },
  experimental: true,
} as const satisfies CodeCheck
