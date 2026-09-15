import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageReading = {
  id: "01a05b1e-1347-77b8-9b46-d0b4f449e698",
  type: "module",
  slug: "page-reading",
  definition: "the whole body standing at a path, and the commit it was read at",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A read answers with the whole body rather than with the keys a page declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A read names the commit its bodies were read at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A read naming a commit is answered at that commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A read naming no commit is answered at the commit HEAD is on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A read naming a commit the repository does not hold is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is placed by the index now rather than by the commit a read names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every body a read answers with is read at that read's commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body is read out of the commit rather than off the working tree.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property held outside the commit has no commit to be read out of.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Such a property is read off the checkout the read was handed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Such a property is read as it is now whatever commit a read names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path standing outside `akasha` is refused before anything is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path with a page's secret values is refused before anything is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path with a page's uncommitted values is refused before anything is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path a page is placed at is withheld by the same rule.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One withheld path refuses the whole read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A withheld path is refused rather than answered as nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is named by its page type and its slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page named that way is placed by the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page the index places nowhere is said to be unplaced.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page the index places at more than one path refuses the read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the commit does not have answers as nothing rather than as empty text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The bodies of a read come back through one git process.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A read that throws is answered as a refusal rather than thrown on.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A read takes no hold.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A body that is not text reads as the replacement character.",
    },
  ],
} as const satisfies Module
