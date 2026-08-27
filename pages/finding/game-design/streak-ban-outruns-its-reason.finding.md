---
id: ae2132e2-e71e-55c7-924f-f8e7940fdc64
page-type-slug: finding
title: "Streak ban outruns its reason"
domain-slug: domain/game-design
---

# Claim

The recorded game-design ruling against streak mechanics is wider than the reason it gives, and live code already stands outside it. The reason names habituation and forward simulation as machinery Alan lacks; the idle game ships a capped positive streak multiplier that aims at neither and carries no penalty for breaking it. The judgment and the wording have come apart, and the wording is what a reader obeys.

# Evidence

The ruling stands in `dirty/skills/game-design/SKILL.md`, now emptied: "NEVER add streaks / decay / loss mechanics — they aim at machinery he doesn't have", under "Octalysis assumes habituation + forward simulator; Alan has neither".

`packages/alanwalton/web/app/idle/lib/core/types.ts` line 151 declares `devotionStreak?: number`. `packages/alanwalton/web/app/idle/lib/core/dormant-bonus.ts` lines 164-167 spend it: "17 Devotion — the focused girl runs hot by her streak. Locked ⇒ ×1", computed as `1 + Math.min((s.devotionStreak ?? 0) * DEV_PER, DEV_CAP)`. Capped, positive-only, no decay and no penalty for stopping.

`rg -ni "streak"` over `domains/` returns zero, so nothing live carries either the ruling or the exception.
