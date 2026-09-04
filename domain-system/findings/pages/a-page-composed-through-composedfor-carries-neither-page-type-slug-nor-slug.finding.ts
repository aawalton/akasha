import type { Finding } from "../finding.page-type.ts"

export const aPageComposedThroughComposedforCarriesNeitherPageTypeSlugNorSlug = {
  id: "01a06881-344f-7000-8927-0012711fb717",
  pageTypeSlug: "finding",
  slug: "a-page-composed-through-composedfor-carries-neither-page-type-slug-nor-slug",
  domainSlug: "domain/akasha-migration",
  claim:
    "A page written through `composedFor` carries neither `pageTypeSlug` nor `slug`, though the page page-type declares both required, so the index never files it and the next command asking for it is answered that it does not stand. No page in the checkout carries the defect today; it is latent in the writer.",
  evidence:
    "akasha/pages-system/service/page-composing/page-composing.module.code.ts line 116 writes a key only where `one.key in named.values`, and lines 124-126 hand `pageTypeSlug` and `slug` to `bodyOf` beside `values` rather than within it. `bodyOf` spends them on the import line and the export name \u2014 page-body's own invariants say a body 'names the type its page answers to' and 'is exported under the name its slug becomes' \u2014 so neither is ever emitted as a key. Seen whole at commit 59835e4c90c3348721cfa621f29411c58c96572c, where `exercise-session-start` wrote akasha/alan/fitness/workout-sessions/pages/thursday-push-2026-09-03.workout-session.ts holding id, title, workoutSessionDate, scheduleDaySlug and workoutSessionStartedAt and neither required key, against sixteen hand-written siblings that all carry both. `exercise-session-finish` then answered that no session was open about a session standing on disk. That page was taken away again at d59644316ca0bd83c6bf0a22ec8bb2c5fe844677. The callers are not at fault: exercise-session-start line 119 and exercise-log-set line 108 both pass `pageTypeSlug` and `slug` to `composedFor` correctly. Blast radius measured rather than assumed: of 15,733 files under akasha/alan that declare a uuid id and satisfy a page type, 0 lack `pageTypeSlug`. An earlier looser scan said 15,754 were missing it by counting stylesheets and route files as pages.",
} as const satisfies Finding
