---
id: 3f7c1e42-8b05-4d19-9a6e-2c4f8b17d930
slug: refusals-bound-cannot-name-a-dispatched-slug
page-type-slug: finding
title: "Refusals bound cannot name a dispatched slug"
domain-slug: domain/change-harness
---

# Claim

Seven calls name their refusal by a variable, and they are two different things. Six read a module const bound to one string literal, where writing the literal costs nothing. The seventh, `agent-hook-block-destructive-git...ts:176`, dispatches over ten refusals, and a literal there means unrolling the loop.

So the rule is right about six and too strict about one. Narrowing it to a slug traceable to a literal in the same module admits the six and still refuses the seventh.

# Evidence

Read 2026-08-28 at `098badd`. The six: `agent-hook-block-addon-direct-install...ts:50`, `agent-hook-block-root-filesystem-scan...ts:102`, `block-whole-suite-run.ts:46` and `agent-hook-block-playwright-stray-filename...ts:21` each pass `HOOK_NAME`, declared at line 7 of its own file as the slug of the one page it prints; `export-declared-here.check.code.attachment.ts:55` and `:62` both pass `SLUG`, declared at line 7 as `export-not-declared-here`.

The seventh passes `refusal.slug` from `refusalFor`, which returns `${HOOK_NAME}-${subcmd}` over the seven verbs of `BLOCKED_VERBS` plus `amend`, `force-push` and `branch-delete`. Those ten are exactly the ten `block-destructive-git-*` documents the check reports as printed by nothing, so the dispatch is real and the pairing is sound.

The two arms meet: of the 24 documents reported unprinted, 15 are printed by these seven calls and go unpaired only because the slug is unreadable. The remaining 9 are named by no quoted string anywhere in tracked TypeScript, so they are orphans of a different kind.

That last count was checked against a case that had to hit before it was believed: the same query over `export-not-declared-here` and `block-whole-suite-run` names their files, and over an invented slug names none.
