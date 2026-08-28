---
page-type-slug: finding
title: "Stale writers refill an evicted cache"
domain-slug: domain/pages-system-answer
---

# Claim

`.git/pages-answers/` holds answers across processes, and a long-lived process started before a fix keeps rewriting stale entries into the same filename within seconds of eviction. Deleting an entry does not settle it: the next read can be the old answer, put back by a writer still holding the old code. Where a value contradicts the source in front of you, this cache and the stale writers are what to suspect before the code.

# Evidence

Verified on 2026-08-28 that the mechanism stands where it is said to. `page/property/answer-cache.ts:4-8` and `:18` compose the store as `<root>/.git/pages-answers`, and an entry is accepted only where its `version` and `mark` both match (`:39`), the version being written in at `:61`. The directory holds 4,614 entries today in five families: `registry` 4,320, `property` 161, `rows` 81, `declarations` 26, `vocabulary` 26. `answeredWhole` is imported by `page/property/registry.ts`, `page/property/declarations.ts`, `page/property/frontmatter.ts`, `page/property/computed.ts` and `tools/page/page-rows-home.ts`, so the vocabulary, the declarations and the compiled page type all reach a reader through it.

Observed by another seat over 2026-08-27 and 2026-08-28, and not reproduced by me: `vocabulary-*.json` entries evicted by hand came back with stale contents within seconds, written by `tools/run-supervisor.ts` processes that had started before the fix and were still running the old code. It was settled by raising `VERSION` in `page/property/answer-cache.ts:8` from 2 to 3, which makes every entry those writers produce inert rather than trying to outrace them. `VERSION` reads 3 today, so that bump has landed.

`pages/finding/agent-harness/supervisor-pools-exhaust-postgres.finding.md` records long-lived `tools/run-supervisor.ts` processes as a source of trouble on another resource. `pages/finding/alert/observer-pins-code-at-start.finding.md` records a long-lived process pinning its code at launch and leaves open whether other long-lived processes launched from this repository do the same; this is one that does.

Not measured: I did not reproduce the eviction race, did not count how many supervisor processes were running, and did not establish whether `services/sweep-page-answers.ts` would have cleared the stale entries on its own schedule or whether raising the version was the only route.
