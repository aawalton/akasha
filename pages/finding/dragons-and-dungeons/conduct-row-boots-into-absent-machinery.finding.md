---
id: 523caba0-0c0c-5f35-8423-8a225560129b
page-type-slug: finding
title: "Conduct row boots into absent machinery"
domain-slug: domain/global
---

# Claim

Aria's live conduct row boots into machinery that is not there. Its Session Startup step 1 is `bun ops persona load aria` with "if it fails, STOP and report verbatim" — a verb the dispatcher does not carry, and whose absence a unit test pins. Step 2 reads state from `packages/stories/authored/dragons-and-dungeons/`, a tree never tracked at any ref, and the row declares itself sole writer of two files that have never existed while the same game's live GM contract says the record is row-authoritative.

# Evidence

Measured 2026-08-07 from `/home/walton/code` while emptying `dirty/skills/ttrpgs/findings.md`. The row is `ops page show 019ef03a-4924-7a7b-9ee2-e34556947658 --properties conduct`, 6,583 bytes, exit 0 — a page row, so a repo search says nothing about it.

`bun ops persona load aria` exits 1 under `ops: unknown command`. The live verbs are `persona exists`, `digest`, `roster`, `level` and thirty more; none is `load`. The removal is pinned: the only occurrence in tracked source is `packages/shared/cli/src/aw/init/bash.unit.test.ts:281`, `expect(anBody).not.toContain("ops persona load")`. The row's instruction on that failure is to STOP.

Step 2 reads state from "`packages/stories/authored/dragons-and-dungeons/` (the `chapters/` and `build/…` files)". `git ls-files "packages/stories/authored/**"` returns 0 and `git log --all --diff-filter=A` over that path returns nothing, so it was never added at any ref. `packages/stories/` holds cli, engine, narration, text. The docs it routes to are quarantined at `dirty/code/packages-stories-authored-docs-*.md`.

The row's first conduct line: "Only I write chapter `status`, `build/dragons-and-dungeons.md` (the live character build), and `decision/dragons-and-dungeons.md` (the append-only decision log) ... that is the deterministic guard that keeps his authoritative state consistent." Swept all seven roots with `rg -uuu -l --glob '!.git/**'`: the only hit is the quarantined findings file this came from. `git log --all -- "**/build/dragons-and-dungeons.md"` is empty.

`bun ops awen gm-load --game dragons-and-dungeons`, exit 0, 79,702 bytes, says the opposite model: `build` occurs zero times; `world-consistency` states "the prose is the authoritative record"; `reconcile-on-wake` states "The NARRATIVE record is row-authoritative ... the committed rows WIN"; and "the old `tower-session`-backed HUD/sheet model is retired".

NOT MEASURED: whether aria has been invoked since the verb went, or whether another persona row cites it. Only aria's row was read.
