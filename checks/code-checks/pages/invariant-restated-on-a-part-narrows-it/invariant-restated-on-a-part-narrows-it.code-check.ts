import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const invariantRestatedOnAPartNarrowsIt = {
  id: "01a0959b-4249-7000-a2fe-cb9db9273952",
  type: "code-check",
  slug: "invariant-restated-on-a-part-narrows-it",
  definition:
    "the check refusing an invariant a page and one of its parts both state word for word",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnWorktree: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An invariant is restated on a part only to narrow what the page above states.",
    },
    {
      invariantKind: "departure",
      statement: "The same words on both narrow nothing, so a part saying them is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A statement is weighed as the page states it, with only the space around it taken off.",
    },
    {
      invariantKind: "departure",
      statement: "The parts a page names are read from the index rather than from the folder.",
    },
    {
      invariantKind: "departure",
      statement: "A page is weighed against the pages it names as parts.",
    },
    {
      invariantKind: "departure",
      statement: "A page is weighed against the pages naming that page as a part.",
    },
    {
      invariantKind: "departure",
      statement: "The part is what a refusal names, whichever of the two pages the change carries.",
    },
    {
      invariantKind: "departure",
      statement: "One restatement earns one refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the page above and the words both pages state.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is judged while this page states `experimental`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads what an invariant means.",
    },
    {
      invariantKind: "absence",
      statement: "A restatement in other words is passed over here, narrowing or not.",
    },
    {
      invariantKind: "absence",
      statement:
        "Two invariants that contradict each other are passed over, whatever words they use.",
    },
    {
      invariantKind: "absence",
      statement: "Whether a restatement narrows is decided nowhere here.",
    },
    {
      invariantKind: "absence",
      statement: "A statement shared by two pages in no parts relation is passed over.",
    },
    {
      invariantKind: "absence",
      statement: "The kind an invariant is stated under is read by nothing here.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
  experimental: true,
} as const satisfies CodeCheck
