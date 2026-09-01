import type { Finding } from "../finding.page-type.ts"

export const anUndecidedSentenceShapeIsABooleanLeftOut = {
  id: "01a05dae-85a6-7668-890a-bbc92c7dc59d",
  pageTypeSlug: "finding",
  slug: "an-undecided-sentence-shape-is-a-boolean-left-out",
  domainSlug: "page-type/sentence-shape",
  claim:
    "A sentence shape carries three states and the page type holds two of them. Allowed and refused are `allowed` set true or false, and undecided is `allowed` left out. A reader meets an absent property and has to be told that absence is a decision rather than an oversight, and nothing in the value says which.",
  evidence:
    "`sentence-shape` was written with `allowed` required, and `sentence-shape/adverb-first` was the first shape Alan wanted parsed without deciding whether akasha writes in it. The property was made optional in commit 2cbd5945 so the shape could land. Two invariants on the page type carry the meaning that the value does not: `A shape Alan has not decided states no allowed.` and `A shape Alan has not decided is admitted until he decides it.` Alan was shown this at the time and said it was fine for now. The cost lands when a shape is read by code rather than by a person, because an absent boolean and a false one are one keystroke apart and only the invariants say they differ.",
} as const satisfies Finding
