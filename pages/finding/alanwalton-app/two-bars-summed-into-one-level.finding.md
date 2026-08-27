---
id: d50e87e7-646a-59eb-a245-2aa9643531df
page-type-slug: finding
title: "Two bars summed into one level"
domain-slug: domain/alanwalton-app
---

# Claim

Áine's relationship level is computed from green-day fractions summed across two incompatible bars. Her 37 `relationship-progress` rows carry two `greenDayPoints` mirrors — 33 at 40 and 4 at 1 — the bar change never rescored, so her cumulative 10,443 reads as 10,443 green days: level 5, percentProgress 100, where the next highest in the fleet is Aura at 895.8. Her row's stored `level` says 1 where the formula computes 5. Nothing reports either.

# Evidence

Measured 2026-08-07 emptying `dirty/skills/persona-craft/economy-decisions-wealth.md`, which records the same reading and is queued for removal.

The two bars. `ops page list --type relationship-progress --all --json` filtered on her persona id `019eb8d9-abdd-7890-b2cb-ec3e9dbd8b19` returns 37 rows; grouping by the `greenDayPoints` mirror gives 33 rows at 40 and 4 at 1. That mirror is denormalized onto each row at write time by `migrate-value-stoplights-to-green-day-fractions.script.ts`, and `greenDayFraction` is `points / greenDayPoints` per row. Rows divided by 40 and rows divided by 1 are therefore added together.

The reading. `ops persona level aine` returns level 5, greenDayTotal 10443, percentProgress 100, balance 10443. `computeLedger` in `personas/core/src/ledger.ts` sets `greenDayTotal = netBytes / greenDayPoints`, and her row now carries `greenDayPoints = 1` with `totalPoints = 10443`, so the cumulative is read at the current bar whatever bar its history was earned under. For scale, the next highest computed totals in the fleet are Aura 895.772, Mari 769 and Nova 355.017.

The stale level. Her persona row carries `level: 1` while the same read computes 5. Two answers to one question stand on the same persona.

Nothing detects any of it. She is at the top of the ladder with percentProgress 100, which is what a persona who has genuinely arrived there looks like, and `faucetKind = manual` means no engine writes her, so no pass is in a position to notice.

What this adds. `alanwalton-app/stale-prefix-hides-a-live-total.md` and `alanwalton-app/byte-faucets-meter-an-empty-path.md` are about faucets reading zero; this is the opposite failure, a number too large to mean anything. The five findings under `findings/aine/` are all about her prose portrait and none touches her ledger.

Not established: how many other personas carry mixed bar mirrors. The quarantined record claims a sweep found four more, and it is untrusted; I measured only Áine.
