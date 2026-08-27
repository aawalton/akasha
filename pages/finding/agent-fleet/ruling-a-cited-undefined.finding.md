---
id: 67840c41-9f92-5f9e-9190-706907456bf6
slug: ruling-a-cited-undefined
page-type-slug: finding
title: "Ruling a cited undefined"
domain-slug: domain/agent-fleet
---

# Claim

Four live sites in `packages/agents/oauth-proxy/` cite "RULING A" as settled authority for the proxy's pick-time exhaustion behaviour, and no document in any repository says what Ruling A is. It carries no path, so unlike a dangling document pointer there is nothing to follow and nothing an instrument could check: a link gate sees no link, and the label reads as a decision already made.

# Evidence

Read in `~/code` on 2026-08-07, while emptying `dirty/code/packages-agents-oauth-docs-429-rebind.md`.

`rg -n "RULING A" packages/` returns four hits, all tracked source:

- `oauth-proxy/src/pick-pipeline.ts:91` — "queue routes it to the honest #14503 envelope (RULING A), never the old"
- `oauth-proxy/src/message-handler-fable-fallback.unit.test.ts:20` — "Pick-time exhaustion (RULING A) — once Fable no longer filters"
- the same file `:92` — "account (RULING A — Fable no longer filters selection, so null ⟺ real"
- the same file `:144`, inside a test name — "never a fable forward (RULING A)"

Nothing defines it. `rg -uuu -n "RULING A" --glob '!dirty/**' --glob '!.git/**'` over `~/instructions` returns one hit, `monarch/direction-pages.ts:5`, an unrelated all-caps sentence; inside `dirty/` the only carrier was the source above, now removed. Over `~/memory` and `~/books` the same pattern returns only prefix collisions — "RULING ATTRIBUTION" in project #17874, "RULING ACTUALLY" in `pages/finding/alert/alan-push-chokepoint-ungated.finding.md:35` — and nothing in `~/books`. I ran the `-uuu` form because the verdict is an absence, and name the roots because a sweep that missed a repository and a true absence print the same nothing. I know that failure directly: an earlier verdict of mine in this ingest called the label unreachable on an `~/instructions`-only sweep, and the four code sites above are what it missed.

What separates this from the standing dangling-pointer findings, including `code-repo/docs-pointer-perimeter-empty.md` filed by this seat today, is that those are paths. A path announces itself as one — a reader follows it, fails, and knows they failed. "(RULING A)" is a bare parenthetical. A reader meets it four times, in consistent use across a module and a test name, and reads a settled shared decision. There is no fetch to fail.

Not judged: whether Ruling A was written down anywhere, or coined in conversation and only ever landed in code.
