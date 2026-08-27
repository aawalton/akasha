---
id: a963339a-f363-5f02-850d-405acc2c6080
slug: browser-test-fixture-reads-alans-game
page-type-slug: finding
title: "Browser test fixture reads Alans game"
domain-slug: page-type/idle-game
---

# Claim

`ensure-idle-game.ts` narrows `createPageIfAbsent` on `idle-game` by `userId`, and `idle-game` states no `owner-slug`, so `askableNarrow` drops the condition rather than testing it. The read half hands Alan's real game to a throwaway test user. Nothing lands today only because the write seam refuses a `userId` narrow on an owner-less type. Relaxing that refusal to match the read side would let a browser-test fixture patch Alan's own page.

# Evidence

Measured 2026-08-20 against the live read path. Nothing was written to either page.

`idle-game` holds 1 page, `memory:pages/idle-game/idle.idle-game.md`, `title: Idle`, `favorited-at: 2026-07-06`, id `01a0087d-e030-72dc-a6ba-baf998c7a46e`, stating no owner key.

That page is not unreachable by its production reader. `packages/alanwalton/web/app/routes/idle.tsx` narrows only `{gameEngine: "idle"}` and returns it; the negative control `{gameEngine: "not-a-real-engine"}` returns null.

The `userId` narrow belongs instead to `packages/shared/browser-test-harness/src/ensure-idle-game.ts`, which resolves a throwaway user by email and passes `where: [{gameEngine: "idle"}, {userId: <throwaway>}]`. Run read-only with a uuid belonging to no user, that where returns Alan's page: `{"id":"01a0087d-e030-72dc-a6ba-baf998c7a46e","slug":"idle","title":"Idle"}`. The fixture would read `created: false` and hand a browser test his game id.

The owner probe reads `idle-game` none=1, alan=1, wrong-uuid=1, garbage=1, so the narrow is dropped rather than tested. Positive control on the same run: `idle-persona-card` none=140, alan=48, wrong=0, garbage=0.

The write half refuses where the read half is silent. On `temper-build-version`, which also stated no `owner-slug` and holds 0 pages, `patchPages` with that same `userId` where threw, naming the key, while `getPages` with it returned n=0 with no warning. `file-write.ts` `SYNTHETIC_KEYS` carries `userId`; `file-synthetic.ts` `SETTLED_BY_THE_READER` does not. A `seq` control throws on the read path, so that guard is reached and the absence of `userId` from it is the whole difference.
