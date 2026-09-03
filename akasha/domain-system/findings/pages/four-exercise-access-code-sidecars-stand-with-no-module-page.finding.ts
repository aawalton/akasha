import type { Finding } from "../finding.page-type.ts"

export const fourExerciseAccessCodeSidecarsStandWithNoModulePage = {
  id: "01a06860-bf1f-7201-b9e1-5f59c232de83",
  pageTypeSlug: "finding",
  slug: "four-exercise-access-code-sidecars-stand-with-no-module-page",
  domainSlug: "domain/akasha-migration",
  claim:
    "`equipment-kit`, `movement-scoring`, `set-progression` and `slot-templates` reached `akasha/alan/fitness/exercise-access/` as a `.module.code.ts` with no `.module.ts` beside it. The other eleven modules in that folder each carry a page, so a code file with no page is the odd shape there rather than the convention. Nothing states what these four are for, what they depart from, or that their code is TypeScript.",
  evidence:
    "Measured 2026-09-03, after filing them from the repo root. `git ls-tree -r HEAD --name-only akasha/alan/fitness/exercise-access/ | grep '.module.ts$'` answers eleven pages: day-of-week, exercise-choosing, exercise-finding, exercise-history, exercise-naming, exercise-rows, exercise-vocabulary, selection-policy, session-derive, set-history and set-volume. It does not answer these four, and no `.module.ts` for them stood at the repo root to file.\n\nThe four were left as they stood rather than given pages written here, because an invariant list is a claim about what the code departs from and I did not design this code. `movement-scoring.module.code.ts` reaches `../selection-policy/selection-policy.module.code.ts`, which is what placed all four in this folder.\n\nThe same shape already stands elsewhere: `akasha/checks/cluster-checks/modules/` holds many `.module.code.ts` files and `grep -c '.module.ts$'` over that tree answered 0 before this work, so a code sidecar with no page is not refused today.",
} as const satisfies Finding
