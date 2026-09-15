import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const changeReachesItsOwnTargetType = {
  id: "01a09c40-0ec4-7764-a533-6c87a8f60dd9",
  type: "check-code",
  slug: "change-reaches-its-own-target-type",
  definition: "the check refusing a change that reaches a change acting on another target type",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change reaches only a change acting on the same target type.",
    },
    {
      invariantKind: "departure",
      statement: "Which page types are changes is read from the page types the index carries.",
    },
    {
      invariantKind: "departure",
      statement: "A page type extending a change page type is a change page type too.",
    },
    {
      invariantKind: "departure",
      statement: "The code beside a change is found through the extension that change states.",
    },
    {
      invariantKind: "departure",
      statement: "An address is read from the parse rather than from the text.",
    },
    {
      invariantKind: "departure",
      statement: "A change's body spelling another change's address is taken as reaching it.",
    },
    {
      invariantKind: "departure",
      statement: "An address is judged wherever in the body that address is written.",
    },
    {
      invariantKind: "departure",
      statement: "An address handed to a helper rather than to a runner is judged the same.",
    },
    {
      invariantKind: "departure",
      statement: "An address built as the body runs is refused rather than read.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal for an address built that way names the line spelling it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which built shape could be an address is read from the page types the index carries.",
    },
    {
      invariantKind: "absence",
      statement: "Which call an address is handed to is not read here.",
    },
    {
      invariantKind: "departure",
      statement: "An address reaching no page is let through.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names both changes, both target types, and the address.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal is filed at the reaching change's page.",
    },
    {
      invariantKind: "departure",
      statement: "One change naming several addresses that reach across is refused once for each.",
    },
    {
      invariantKind: "departure",
      statement: "One address spelled twice in one body is refused once.",
    },
    {
      invariantKind: "departure",
      statement: "A change whose page the landing takes away is not judged.",
    },
    {
      invariantKind: "departure",
      statement: "The check runs where a change's code is carried and that change's page is not.",
    },
    {
      invariantKind: "departure",
      statement: "Running at change keeps a new reach across target types from landing.",
    },
    {
      invariantKind: "absence",
      statement: "Whether an address reaches a page at all is not judged here.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 20 },
} as const satisfies CheckCode
