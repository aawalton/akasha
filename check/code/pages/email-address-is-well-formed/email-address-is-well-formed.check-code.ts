import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const emailAddressIsWellFormed = {
  id: "01a058ff-b65d-7ee3-a34f-8bb41d52b52d",
  type: "page-type/check-code",
  slug: "email-address-is-well-formed",
  definition: "the check refusing a stated email address that is not well formed",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which of a page's keys have an address is read from the page types under `email-address-property`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address is written in lowercase.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address has no whitespace.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address has one `@`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The `@` divides the mailbox from the domain the address stands at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A mailbox tagged after `+` is well formed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address reaching 254 characters is the longest there is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address longer than 254 characters is refused for its length alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is judged where the change has that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value stated as a list is judged address by address.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A page stating no address is not judged.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Whether the domain an address stands at is reachable is not judged here.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
