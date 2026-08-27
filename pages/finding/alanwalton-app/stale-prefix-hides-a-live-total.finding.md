---
id: bed740aa-ff21-575c-81e1-948a188edf1d
slug: stale-prefix-hides-a-live-total
page-type-slug: finding
title: "Stale prefix hides a live total"
domain-slug: domain/alanwalton-app
---

# Claim

Four personas whose faucet moved to project completions still carry the retired byte faucet's `pointsPathPrefix`, and `ops persona level` branches on the prefix rather than on the faucet kind, so it reads git bytes and never their `totalPoints`. Ember (285 points), Athena (954), Astra (279) and Awen (111) all report level 1 and greenDayTotal 0. The faucets work; only the reading is blind. Nothing reports it: a zero from a retired source is what a persona who has not yet earned looks like.

# Evidence

Measured 2026-08-07 emptying `dirty/skills/persona-craft/economy-decisions-wealth-completions-e-v.md`, whose Ember block records the narrative half and not the ledger half.

The branch. `packages/alanwalton/personas/cli/src/persona/resolve.ts:204` reads

    prefixes.length === 0 ? Promise.resolve(attributes.totalPoints ?? 0) : readNetBytes(prefixes)

and hands the result to `computeLedger` as `netBytes`. A non-empty `pointsPathPrefix` shadows `totalPoints` outright; the test is the prefix's presence, never `faucetKind` or `faucetSource`.

The population. Four persona rows carry `faucetKind external` with `faucetSource owned-project-completions`, so the completions pass owns their points, while still carrying `faucetAggregate bytes` and a prefix:

    ember   packages/temper/                                              285
    athena  [".claude/","packages/agents/","packages/shared/dotfiles/"]   954
    astra   packages/shared/pages/                                        279
    awen    packages/alanwalton/awen/                                     111

The reading. `ops persona level` returns level 1, greenDayTotal 0 for all four. Dalla is the control — same faucet source, same bar of 4, no prefix — and returns level 3, greenDayTotal 61.75, her 247 `totalPoints` over her bar exactly. `computeLedger` in `personas/core/src/ledger.ts` sets `greenDayTotal = netBytes / greenDayPoints`, so only the input differs. Athena is the sharpest: the fleet's largest completions total, reading as a persona who has never earned.

Against the nearest standing finding, `alanwalton-app/byte-faucets-meter-an-empty-path.md`: that is a different four, still on `faucetKind windowed`, whose prefixes resolve to empty paths so nothing is earned at all. Here the points ARE earned and a field the migration left behind hides them at read time.

Not established: whether the repair is clearing the prefixes, branching `resolve.ts` on `faucetKind`, or a coherence rule refusing `faucetAggregate: bytes` beside a completions `faucetSource`.
