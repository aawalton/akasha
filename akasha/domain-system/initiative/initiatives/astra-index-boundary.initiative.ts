import type { Initiative } from "../initiative.page-type.ts"

export const astraIndexBoundary = {
  id: "01a05373-78ba-772e-be45-8404f3cfda5f",
  pageTypeSlug: "initiative",
  slug: "astra-index-boundary",
  domainSlug: "domain/indexes",
  personaSlug: "astra",
  invariants: [
    {
      invariantKind: "gap",
      statement: "Everything outside the indexes folder asks the index a question and is answered.",
    },
    {
      invariantKind: "gap",
      statement:
        "Nothing outside the indexes folder knows where the index stands, what shape the files under it take, or how one of them is read.",
    },
    {
      invariantKind: "gap",
      statement: "A question no answer covers is answered by the indexes folder.",
    },
    {
      invariantKind: "gap",
      statement:
        "What crosses the boundary is a question, its answer, or the index as a change leaves it.",
    },
    {
      invariantKind: "gap",
      statement:
        "The boundary is held by a rule over the folder rather than by a list of the names it refuses.",
    },
    {
      invariantKind: "gap",
      statement: "Every check standing over the boundary judges on every phase.",
    },
  ],
  notes: [
    "The questions come first. Twelve of them stand behind the paths callers take today. Ten " +
      "absorb without argument, and the two that look irreducible are not: building the index into " +
      "a named directory, and loading the keeper by name, are the index's own business rather than " +
      "a caller's. Once every question is answered nothing outside wants a path, and the count " +
      "falls to zero on its own rather than being driven there file by file.",
    "`Reading` is three filesystem operations wearing a type, and it should not cross. The index " +
      "as a change leaves it is the object worth passing, and every check judging a change already " +
      "holds one. Absorbing what names a page and what imports a file takes `Reading` out of " +
      "graph-asking and out of the file-import warrant; what is left of it are pass-throughs.",
    "`index-asked-not-reached` names the twelve exports it refuses. That list stands in for the " +
      "boundary rather than being it: it wants maintaining and it drifts. Once the questions are " +
      "absorbed the rule is a folder rule, as `imports-inside` is at the akasha boundary, and " +
      "needs no list. Re-exports are refused here, so the public face is named modules and not one " +
      "file standing in front of the rest.",
    "Neither check binds the whole tree yet. Turning them on before the answers exist refuses " +
      "thirty-one files that have nowhere to go, and taking the names out of the exports without " +
      "turning them on sends callers back to spelling the path. The order is: answer, then zero, " +
      "then the folder rule, then the phases.",
  ],
} as const satisfies Initiative
