---
id: 64ac791e-223e-53ff-8b75-02b987870d75
slug: eppie-header-denies-its-own-body
page-type-slug: finding
title: "Eppie header denies its own body"
domain-slug: domain/alanwalton-app
---

# Claim

The Eppie song-points worker's module header denies two things its own reconcile body does. It says the worker wires no daily stoplight and does not touch the value relation, while the body writes her daily faucet row and passes her value into that write; and it says `persona-reward-watcher` excludes her by a value-ownership filter that project #13539 dissolved.

# Evidence

`packages/alanwalton/eppie-song-points/src/eppie-song-points.worker.ts:27-31` reads: "It does NOT mirror onto the `value` relation and wires NO stoplight and NO reward images — those are the value-persona economy, from which Eppie … is excluded in `persona-reward-watcher` by the value-ownership filter."

The body of `reconcile` in that file makes two writes, not one. After `patchPageById(sb, { … set: { totalPoints: write } })` it calls `writePersonaDayPointsFromTotal(sb, getEsoDayStr(new Date()), s, { id: eppie.id, title: …, value: eppie.value, greenDayPoints: … })`. That function, at `packages/alanwalton/daily-tracking/src/persona-day-faucet-delta.ts:86`, writes `{ faucetPoints, faucetTotalSnapshot: currentTotal }` onto her `(persona, ESO day)` `relationship-progress` row. The inline comment at the call site states the purpose the header denies: "the total drives her level, this slice lights the value stoplight." The call also passes `value: eppie.value`.

The exclusion is gone too. `rg -n "ownerPersona"` over `packages/alanwalton/persona-reward-watcher/src/` exits 1. `standings.ts:7-8` says why: the value-owner/companion split is dissolved (project #13539), with no value-presence filter. The executable line agrees — `standings.ts:116` is `const personaRows = (await getPages(sb, { pageTypeSlug: PERSONA_PAGE_TYPE_SLUG })).rows`, carrying no `where:` clause. The standing it derives includes `dailyGreenDays`, read from today's points on her own `relationship-progress` row — the row this worker writes.

The same withdrawn distinction stands at a different site: Erin's persona-row `earningNarrative` against the fold in `daily-stoplights.ts`. Added here is a source-code header contradicting its own function body, and `standings.ts` as a second denier.

Read at `~/code` on 2026-08-08 while ingesting `dirty/code/packages-alanwalton-eppie-song-points-claude.md`.
