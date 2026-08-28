---
id: 1db5ea9c-ffba-5c63-a7e8-f8287d26bfd3
slug: degraded-zero-shows-onboarding
page-type-slug: finding
title: "Degraded zero shows onboarding"
domain-slug: domain/temper
---

# Claim

`home-page-content.tsx:286`'s `importedCharacters.length === 0 && <HomeGetStartedCard />}` collapses "I stopped waiting" and "there are none" into the same zero-length signal, so after #16113's boot-gate can grant `acquire.ready` on a timer overrun without a fold, a signed-in user with existing characters is shown the get-started card on `/home`, the route every signed-in visitor lands on.

# Evidence

Project #16226, domain `temper`, `someday_maybe`.

2026-07-25T15:58Z: found by #16113's implementer, named the strongest follow-up — the same collapsed-zero, two-states-one-symbol shape recurring this milestone, now on the first surface a new user sees.

    packages/temper/web/.../home-page-content.tsx:286
    {importedCharacters.length === 0 && <HomeGetStartedCard />}

After #16113 (`dd562f1d4121`) the boot gate can grant `acquire.ready` on a 4000ms overrun without a fold, so `use-query` returns `{rows: [], isLoading: false}` — a zero it never measured. That pair means both "I stopped waiting" and "there are none," and this line reads it as the second. Consequence: a user with 20 characters is shown the get-started card on `/home`, the route every signed-in visitor lands on. Measured onset ~4.4s; sustained variant still up at 17s.

Cheap to fix at filing: #16113 landed `AcquireResult.degraded` (timer- vs fold-granted, self-healing on late fold) projected as `isDegraded = degraded && rows.length === 0`, plus the pure decider `decidePlanEmptyState` — the carrier already exists, so this is a one-line consumer change, not a new mechanism.

Two siblings from the same passback, left out of scope: `companions-data-content.tsx:49-52` (identical shape); `use-completion-progress.ts:183-185` (passes `viewUserId ?? ""`, an empty-string sentinel `pages/ui` CLAUDE.md:33 bans). Not cheap: a third degrade timer (`usePipelineLive` store-readiness), different symbol, needing its own scoping.

Measurement warning: `bun ops browser-test verify-render` returned 0 of 8 on this class while a positive control passed 3 of 3 same session — the false-empty can be a ~165ms flash, node-side polling (40ms + round-trip) too coarse; only an in-page MutationObserver + rAF recorder caught it. A clean verify-render run is not evidence of absence here. Also load-dependent: 2-of-5 on a loaded cluster, 0-of-8 on an idle one — attributed to cluster load, not instrument error.
