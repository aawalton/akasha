import type { Finding } from "../finding.page-type.ts"

export const askExercisePagesIsOneFunctionDeclaredInTwoFiles = {
  id: "01a0615d-7da5-7000-9734-236678e97a01",
  pageTypeSlug: "finding",
  slug: "ask-exercise-pages-is-one-function-declared-in-two-files",
  domainSlug: "domain/akasha-migration",
  claim:
    "`askExercisePages` is one function declared in two files. `tools/lib/exercise-ask-pages.ts` and `tools/lib/daily-tracking/exercise-pages.ts` hold the same three statements character for character and reach the same client, differing only in declaration form. Neither names the other and their callers are disjoint, so a correction to how the checkout is asked reaches one set of readers and not the other. Whether the two become one is not decided here.",
  evidence:
    "Measured 2026-09-02, while moving the first of the two out of `tools/commands/exercise/` where every `.ts` file is counted as a command. The previous lane left this question open in a finding removed at `757a41f12a`; this settles it.\n\nThe declarations differ. `tools/lib/exercise-ask-pages.ts:30` is a const typed `AskPages` holding an async arrow; `tools/lib/daily-tracking/exercise-pages.ts:23` is an async function declaration. The three statements under each are byte-identical, confirmed by diffing lines 31-33 against 24-26, which reports no difference. Both import `composedFor`, `pageOfRow`, `PageQuery` and `PagesRead` from `@collections/exercises/pages/access`, and both take `askComposed` from `tools/lib/page-query-client.ts`. Each carries its own doc comment naming a different set of page types the remote index would not answer for, and those comments are the only prose that differs.\n\nThe callers are disjoint and neither file imports the other. `exercise-ask-pages.ts` is taken by `equipment-list.ts:7`, `constraint-list.ts:9` and `mobility-show.ts:10`. `daily-tracking/exercise-pages.ts` is taken by `strength-points.ts:2` alone.\n\nThe call taken: nothing was merged. Merging them is a change to how every exercise reading command and the strength points recompute reach the checkout, and that was not what this lane was sent for. What is recorded here is only that there is one function and two declarations of it, so the next reader need not measure it again.",
} as const satisfies Finding
