import type { CodeCheck } from "../../code-check.page-type.ts"

export const emailAddressIsWellFormed = {
  id: "01a058ff-b65d-7ee3-a34f-8bb41d52b52d",
  pageTypeSlug: "code-check",
  slug: "email-address-is-well-formed",
  definition: "the check refusing a stated email address that is not well formed",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Which of a page's keys hold an address is read from the page types under `email-address-property`.",
    },
    {
      invariantKind: "departure",
      statement: "An address is written in lowercase.",
    },
    {
      invariantKind: "departure",
      statement: "An address holds one `@`.",
    },
    {
      invariantKind: "departure",
      statement: "The `@` divides the mailbox from the domain the address stands at.",
    },
    {
      invariantKind: "departure",
      statement: "A mailbox tagged after `+` is well formed.",
    },
    {
      invariantKind: "departure",
      statement: "An address reaching 254 characters is the longest there is.",
    },
    {
      invariantKind: "departure",
      statement: "An address longer than that is refused for its length alone.",
    },
    {
      invariantKind: "departure",
      statement: "A page is judged where the change carries that page.",
    },
    {
      invariantKind: "departure",
      statement: "A value stated as a list is judged address by address.",
    },
    {
      invariantKind: "absence",
      statement: "A page stating no address is not judged.",
    },
    {
      invariantKind: "absence",
      statement: "Whether the domain an address stands at is reachable is not judged here.",
    },
  ],
} as const satisfies CodeCheck
