---
id: 28fea2bf-3a82-5fe7-861a-f5e79ffb22de
slug: nova-header-denies-its-own-mirror
page-type-slug: finding
title: "Nova header denies its own mirror"
domain-slug: domain/alanwalton-app
---

# Claim

The Nova words-read reconcile denies, twice in its own file, a write its body makes: a head docblock and an inline comment both say she is a secondary persona with "NO value-mirror write; only her persona row is touched", and thirty lines below it passes `value: nova.value` into the shared persona-day faucet write. A standing finding cites this very docblock as proof the secondary/functional distinction still gates behaviour. It gates nothing here.

# Evidence

Measured 2026-08-08 at `~/code` on `main`, while emptying `dirty/code/packages-alanwalton-nova-words-read-claude.md`, whose `## Secondary persona` section carried the same claim and was cut as false.

The denials. `packages/alanwalton/nova-words-read/src/actions/reconcile-nova-words-read.ts` head docblock: "Nova is a secondary (functional) persona — she does not own her value — so there is NO value-mirror write; only her persona row is touched." An inline comment above the persona write repeats it: "Secondary persona: no value-mirror, only the persona row."

The body. Below that comment the same function calls `patchPersonaDayField(sb, dayStr, FAUCET_POINTS_FIELD, delta.wordsReadPoints, { id: nova.id, title: …, value: nova.value, greenDayPoints: … })`. `FAUCET_POINTS_FIELD` is `"faucetPoints"` (`personas/core/src/ladder.ts:138`).

The type carries the mirror, so the argument is not incidental. `PersonaDayTarget` at `daily-tracking/src/persona-day-points.ts:219-224` declares `readonly value: string | undefined`, and the create branch of `patchPersonaDayFields` executes `...(persona.value !== undefined ? { value: persona.value } : {})` onto the new `relationship-progress` row. Her row has one: `ops page show 019f0562-42f7-7a2c-bb5b-e293a89210a4` returns a set `value`.

Nothing downstream excludes her. `rg -n 'ownerPersona|valueOwner|secondary'` over `packages/alanwalton/persona-reward-watcher/src/` exits 1; `standings.ts:116` is `getPages(sb, { pageTypeSlug: PERSONA_PAGE_TYPE_SLUG })` with no `where:`; `aggregateValueUnits` at `shared/status-bar-access/src/daily-stoplights.ts:107` folds every persona in with no exclusion branch.

What this adds. `pages/finding/alanwalton-app/eppie-header-denies-its-own-body.finding.md` is this shape at another worker. This is a second, and it goes further: this Nova docblock has been cited as evidence that the distinction "gates real behaviour" in live code. That supporting claim is false.
