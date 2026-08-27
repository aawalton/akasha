---
id: 3fb8e302-8a44-50a1-969a-32ddef063284
page-type-slug: finding
title: "Opus 5 headless auto fallback pinned"
domain-slug: domain/technology
---

# Claim

Claude Opus 5, launched 2026-07-24 as model ID `claude-opus-5` at the same API price as Opus 4.8, resolves automatically wherever the fleet's headless, subagent, and worker paths use the bare `opus` alias, while the Fable-rate-limit fallback path stays pinned away from it to `claude-opus-4-8` and the interactive tier still runs Fable 5.

# Evidence

Project #15861, domain `technology`, status `someday_maybe`. Scouted by nimue (tech-scout/Wealth); handed off by agent 019f82e2 (out-of-lane).

Verified: Opus 5 launched 2026-07-24 (anthropic.com/news/claude-opus-5 + system card same date). Model ID `claude-opus-5`. API pricing $5/$25 per Mtok in/out — identical to Opus 4.8. Capability: near-Fable-5 — CursorBench within 0.5% of Fable 5 at half cost; OSWorld 2.0 beats Fable 5's best at ~1/3 cost; >2x Opus 4.8 on Frontier-Bench; behind Mythos 5 only on cybersecurity. New default on Claude Max. Safety-flagged requests fall back to Opus 4.8.

Existential-risk watch (subscription-terms/OAuth, the #1 architecture risk): no alarming change found; launch judged capability-positive, cost-neutral for the subscription. A third-party claim of Fable bundling ending 2026-07-20 was unverified, TODO to confirm.

Model-vocab has two "opus" paths (from `fable-fallback.unit.test.ts` + oauth-proxy docs): `toCliAlias('opus')` → bare `opus` on `claude --model`, used by headless default + subagent 'opus' + worker default — auto-adopts Opus 5 free, zero repo change. `toWireId('opus')` → `claude-opus-4-8` via a `WIRE_BY_LOGICAL` pin at `model-vocab.ts:28`, used by the Fable-rate-limit fallback + display label — stays pinned to 4.8, reasoned as wanting headroom (4.8 less-contended) over peak capability.

Test-sentinel issue at `fable-fallback.unit.test.ts:87-91`: `.not.toBe(claude-opus-5)` is a substring-swap regression guard, previously guaranteed-invalid; now Opus 5 is real/valid, so a regression to substring-swapping would silently produce a valid-but-wrong model.

Recommendation drafted: (1) headless/subagents auto-upgrade free; (2) interactive Fable→Opus5 is Alan's call (~50% cost, near-Fable quality, reversible trial); (3) fallback stays 4.8; (4) fix the test sentinel; (5) reshuffle subagent thresholds with Opus 5 as mid-tier. Interactive-model config seam not yet traced.

No `# Objective` — captured, never defined.
