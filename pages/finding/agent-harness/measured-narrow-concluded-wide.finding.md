---
id: 92ae76fb-b8f3-5efc-b7f9-7774e68fd1e7
slug: measured-narrow-concluded-wide
page-type-slug: finding
title: "Measured narrow concluded wide"
domain-slug: domain/agent-harness
---

# Claim

A pass runs an instrument correctly, then states a conclusion wider than what the instrument measured, and nothing reports the gap. An absence measured in one instrument becomes a claim that nothing anywhere covers the surface, and work is defined or filed against it.

# Evidence

Measured 2026-08-02, all four firsthand.

**#17491**, a define pass. Measured that `hooks-agree.ts` does not compare `~/code/.claude/settings.json`, and concluded "Nothing compares it against anything." `check-configs.ts:150` registers that path as a `hook-wiring` watch node and `check-hook-wiring.ts:60` reads it. It was carried into a question put to Alan, whose answer selected the deletion arm from it: the fact he supplied stands, the inference around it does not.

**#17490**, a define pass. Measured that no glob can govern `dirty/`, and concluded the system prompt could graduate whole. `token-ceiling.ts:48` sets `BYTE_CEILING = 15_000` with two skips and no exemption; the file is 27,529 bytes. Graduation whole is impossible, and the split it recommended was right for a reason it never gave.

**`attention-doctrine-unauthored`**, a finding. Searched `~/instructions` for the doctrine the system prompt defers to, found two unlinked mentions, and concluded it "has never been authored". `packages/agents/shared/docs/attention-questions.md` is 182 lines, added 2026-07-09 — three weeks before the filing.

**`instruction-surfaces-split-across-repos`**, a finding. Counted 469 `CLAUDE.md` files in the code tree and concluded the estate's instruction surfaces are split across two repositories. Every seat's cwd is `~/instructions` (`supervisor-interactive.ts:76`), which holds no `CLAUDE.md` at or above it, so not one of the 469 is loaded by anything.

Each instrument was run correctly. In each case the pass generalised from *this instrument does not cover it* to *nothing covers it* — a claim about the whole instrument set, which nothing sampled.

The failure is invisible where it happens: the measurement is recorded, reproducible and true, and the conclusion sits beside it as its summary. A reviewer re-runs it, finds it green, and confirms the wrong sentence.

The shape is not confined to define passes: two of these are findings.
