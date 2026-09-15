import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const invariantRestatedOnAPartNarrowsIt = {
  id: "01a0959b-4249-7000-a2fe-cb9db9273952",
  type: "page-type/check-code",
  slug: "invariant-restated-on-a-part-narrows-it",
  definition:
    "the check refusing an invariant a page and one of its parts both state word for word",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An invariant is restated on a part only to narrow what the page above states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The same words on both narrow nothing, so a part saying them is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A statement is weighed as the page states it, with only the space around it taken off.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The parts a page names are read from the index rather than from the folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is weighed against the pages it names as parts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is weighed against the pages naming that page as a part.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The part is what a refusal names, whichever of the two pages the change carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One restatement earns one refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names the page above and the words both pages state.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing is judged while this page states `experimental`.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads what an invariant means.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A restatement in other words is passed over here, narrowing or not.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "Two invariants that contradict each other are passed over, whatever words they use.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Whether a restatement narrows is decided nowhere here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A statement shared by two pages in no parts relation is passed over.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The kind an invariant is stated under is read by nothing here.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
  experimental: true,
} as const satisfies CheckCode
