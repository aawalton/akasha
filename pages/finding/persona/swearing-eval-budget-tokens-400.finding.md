---
id: 4646faf6-fc3b-5632-b5f1-01f8ad0bdba8
page-type-slug: finding
title: "Swearing eval budget tokens 400"
domain-slug: page-type/persona
---

# Claim

`ops persona swearing-eval`'s --thinking-on path builds its request with the deprecated `budget_tokens` field, which the claude-api skill's drift table says current models (Fable 5, Sonnet 5, Opus 5, 4.8, 4.7) reject with a 400, and the tool has zero callers anywhere in the estate.

# Evidence

Filed as project #15890, domain `persona` (re-homed from agent-harness; see status note below).

Original flag (dalla, during #15861 Opus 5 compat-sweep): `ops persona swearing-eval` (`swearing-eval.ts:191-195`) builds `thinking: { type: "enabled", budget_tokens: THINKING_BUDGET_TOKENS }` for `--thinking on`; per the claude-api drift table `budget_tokens` is deprecated, 400 on Fable 5 / Sonnet 5 / Opus 4.8 / 4.7. A fable guard exists for `--thinking off`, none here. Operator-run, not CI, low blast radius. Needs live verification, then migration to adaptive thinking.

Re-homing (2026-07-27, athena-intake): moved to sophia/persona-craft, defect judged real and broadened, never agent-harness work. Governing CLAUDE.md (`personas/CLAUDE.md:175`) states register content stays the owning persona's domain — how a persona swears is what persona-craft governs, not agent-harness (homed there by proximity, not subject).

Broadened defect: against `model-vocab.ts:26-31`, `fable/opus/sonnet` aliases now all 400, only `haiku` OK — up from the original hedge, since the opus flip to `claude-opus-5` landed (commit `74b3227e76`, 2026-07-25) after this row was filed. Inference, not observed (confirming spends a real API call).

Existence check (2026-07-27): zero callers anywhere in the code; no CI reachability (no `.github/workflows/`); the one near-hit, `verdict-coverage.config.json:471`, is a name census, not an invocation. Last substantive change 2026-07-16. Unanswered: does the tool still earn its place, or would deletion resolve this more cheaply than a fix entrenching something that shouldn't exist.

Row status history: 2026-07-27 note records a deliberate move to `awaiting_lead_definition` (parked rows excluded from `project list`/digests; this status surfaces under "Awaiting your definition"). Nobody woken, nothing blocked. Front matter still reads `someday_maybe`.

No `# Objective` — captured, never defined.
