import type { Module } from "@akasha/code-system/module"

export const claudeAccountSelection = {
  id: "01a06317-aa49-76b2-bddc-ce6b4936da3c",
  pageTypeSlug: "module",
  slug: "claude-account-selection",
  definition: "which account of a fleet a call is made on next",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The account whose seven-day window resets soonest is picked.",
    },
    {
      invariantKind: "departure",
      statement: "A tie on the hours until the seven-day reset falls to the lower seven-day share.",
    },
    {
      invariantKind: "departure",
      statement: "A tie on the seven-day share falls to the lower five-hour share.",
    },
    {
      invariantKind: "departure",
      statement: "A tie on both shares falls to the account slug ascending.",
    },
    {
      invariantKind: "departure",
      statement: "An account is eligible where both its shares sit below 100.",
    },
    {
      invariantKind: "departure",
      statement: "An account the exclude set names is dropped before the ranking.",
    },
    {
      invariantKind: "departure",
      statement: "An account no measurement covers is ranked as having spent nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "An account no measurement covers is ranked by the hours an unknown reset answers.",
    },
    {
      invariantKind: "departure",
      statement: "A fleet holding no eligible account is answered as no pick.",
    },
    {
      invariantKind: "departure",
      statement: "The hours until a seven-day reset are answered by a function handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A pool summary counts the accounts that are eligible.",
    },
    {
      invariantKind: "departure",
      statement: "A pool summary carries the count of the whole fleet.",
    },
    {
      invariantKind: "departure",
      statement: "A maxed account is free again at the later of the resets blocking that account.",
    },
    {
      invariantKind: "departure",
      statement: "A blocking window naming no reset leaves an account's return unknown.",
    },
    {
      invariantKind: "departure",
      statement: "An eligibility breakdown names each account beside its reasons.",
    },
    {
      invariantKind: "departure",
      statement: "A pick answers with the candidate the caller handed in rather than with a copy.",
    },
    {
      invariantKind: "departure",
      statement: "The moment a pick is made at reaches this code as a number.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller ranks only the accounts that caller hands in.",
    },
    {
      invariantKind: "constraint",
      statement: "A candidate carries the account slug the measurements are keyed by.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the clock.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here fetches the accounts a ranking reads.",
    },
    {
      invariantKind: "gap",
      statement: "Eligibility never reads `subscriptionDisabled`.",
    },
    {
      invariantKind: "gap",
      statement: "Eligibility never reads `renewalTerminal`.",
    },
    {
      invariantKind: "gap",
      statement: "Eligibility never reads `fiveHourAtLimitUntil`.",
    },
    {
      invariantKind: "gap",
      statement: "Eligibility never reads `accessTokenExpiresAt`.",
    },
    {
      invariantKind: "gap",
      statement: "An account whose subscription is withdrawn is picked as any other account is.",
    },
    {
      invariantKind: "gap",
      statement: "An account that can no longer renew itself is picked as any other account is.",
    },
    {
      invariantKind: "gap",
      statement:
        "The hours answered for an unknown seven-day reset sit below a freshly opened window's hours.",
    },
    {
      invariantKind: "gap",
      statement: "An account no measurement covers outranks an account whose window just reset.",
    },
    {
      invariantKind: "gap",
      statement:
        "An account whose seven-day reset has passed is ranked as an account with no known reset.",
    },
    {
      invariantKind: "gap",
      statement:
        "A seven-day reset that will not parse is ranked as a reset nothing is known about.",
    },
    {
      invariantKind: "gap",
      statement: "The ordering here is spelled a second time in `claude-account-measuring`.",
    },
    {
      invariantKind: "gap",
      statement:
        "The account types this module reads sit under the gateway rather than under the accounts.",
    },
  ],
} as const satisfies Module
