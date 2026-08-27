---
id: f10d7322-8141-5f4a-bc6e-9c9848ea5a15
page-type-slug: finding
title: "Digest page ordered against its display"
domain-slug: domain/alanwalton-app
---

# Claim

The boot digest's recent-outcomes read pages the 200 LOWEST project seqs and then displays the 10 highest of those, so the cap and the display order run opposite ways and an owner past 200 recent terminal rows is shown the wrong ten with nothing saying so.

# Evidence

`fetchDigestData` in `packages/alanwalton/personas/cli/src/persona/boot-digest-fetch.ts` asks `getPages` for terminal rows owned by the persona's seats and updated inside `RECENT_TERMINAL_WINDOW_MS = 3 * 24 * 60 * 60 * 1000`, at `limit: 200`, stating no `order`. `packages/shared/pages/access/src/get.ts:269` sets `DEFAULT_ORDER: PageOrder = [{ by: "seq", dir: "asc" }]` and `:305` takes it whenever the caller states none, so the page returned is the 200 OLDEST matching rows. The result is then sorted the other way and truncated: `.sort((a, b) => b.seq - a.seq).slice(0, RECENT_TERMINAL_CAP)` at lines 257-258, `RECENT_TERMINAL_CAP = 10` at line 63.

Below 200 matching rows the page holds every row and the answer is right. At 201 the ten shown are the ten highest among the 200 oldest, and the newest outcomes — what the section exists to show — never entered the page. Nothing tells the two readings apart from inside the digest: it renders ten lines either way, which is what makes it a silent wrong answer rather than a visible truncation. Against [Population] on `domains/instrument.md` the read states no population size and does not fail where it could not look at one.

Latent rather than firing. I did not measure any owner's row count; establishing it needs a count of terminal project rows per owner inside the three-day window, which is one query. That window bounds the exposure: 200 for one owner in three days is reachable at fleet throughput rather than absurd.

Found while emptying `dirty/skills/agent-harness/findings/boot-context-and-load-budget.md`, which recorded the same defect and is queued for removal. Nothing in `~/memory/findings/` covered it — `rg -i 'recent.terminal|RECENT_TERMINAL|boot.digest'` returned two files, both on other subjects, and `rg -i 'lowest seq|seq asc|limit: 200'` returned none.
