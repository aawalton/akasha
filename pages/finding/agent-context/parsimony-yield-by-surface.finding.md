---
id: 7d02f770-3815-5153-9d3a-b6d33f150252
slug: parsimony-yield-by-surface
page-type-slug: finding
title: "Parsimony yield by surface"
domain-slug: domain/agent-context
---

# Claim

Globally loaded context is paid on every agent boot, and a token yield of up to 29% is available on generated and inherited documents without removing content, while dense normative doctrine is already near its floor.

# Evidence

Alan's directive (2026-07-25): "a close read Parsimony pass, reduce tokens without removing content, across globally loaded context including persona loads," targeting approved same session.

Baseline (Opus 5 tokenizer): Tier 2 repo CLAUDE.md 13,869 tokens (9,844 on Opus 4.5 — Opus 5/Fable 5 tokenize markdown ~1.40x less efficiently; figures are Opus-5 currency); persona load (nimue) 12,583; Tier 1 Global Principles 7,793; curated system prompt 7,327; memory core (nimue) 3,635; TOTAL 45,207.

Approach: compress expression, not delete substance. A deterministic gate (referents.ts, untracked scratch) checks every link target, backticked identifier, bolded pattern and heading survives the rewrite; verified both ways, passing on identity, failing on known-bad input.

Targeting (Alan approved): yield depends on document type, not writing quality. Tier 1 Global Principles (dense doctrine): 1.8% (27 tokens), at its floor. FP index (routing metadata): 29.0% (1,687 tokens), 68 entries and 194 referents preserved. A 16x spread.

Adherence constraint: doctrine is recalled mid-task, not read once; vivid phrasing is functional encoding, not padding — compressing it to bare propositions measures smaller but degrades adherence invisibly. Token reduction is not the success metric on doctrine.

Scope: in — the documents above. Out — Tier 1 worktree duplication (#16279, separate, already dispatched); .claude/CLAUDE.md's location untouched.

Ready to land: fp-rewrite.md (FP index -29%, gate PASS, 68/68 entries, 194/194 referents; one flagged call — "Load when" hoisted from all 68 entries into one preamble line, reverting costs ~136 tokens); referents.ts (the gate); measure.ts, delta.ts — untracked scratch. Landing the gate as a reusable check is part of this project.

A persona-payload composition analysis (12,583 tokens, largest document) traced to the real compile path (personas/core/src/compile.ts), cut mid-paragraph before its headline conclusion landed. Was #16286.
