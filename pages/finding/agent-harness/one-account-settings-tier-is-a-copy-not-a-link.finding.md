---
id: 62bdba36-94e7-51d4-92be-850249d6590e
page-type-slug: finding
title: "One account settings tier is a copy not a link"
domain-slug: domain/agent-harness
---

# Claim

Seven of the eight per-account Claude settings files are symlinks to one original and the eighth is a real copy, so an edit to the original reaches seven accounts and silently skips the one the primary account runs under — which is also the file the estate's own agreement check reads.

# Evidence

Measured 2026-08-04 under `/home/walton/.claude/accounts/`.

Eight accounts carry a `settings.json`. Seven — `aine`, `alanwalton`, `amywalton`, `aow`, `audhdalan`, `ctw`, `tempereso` — are symlinks to `/home/walton/.claude/settings.json`. One, `aawalton`, is a regular file of 5,352 bytes with the same mtime as the original (Aug 3 12:58).

`diff` reports the two identical today, so nothing is currently wrong. What is missing is anything that keeps them so: an edit to `~/.claude/settings.json` propagates to seven accounts through the link and leaves `aawalton` on the previous body, with no instrument comparing them.

`aawalton` is the account this session runs under, and `tools/checks/hooks-agree.ts` resolves its comparison target per-account: its passing line on this run reads "25 hooks registered by both files under one key, 0 by one of them only and firing once, against /home/walton/.claude/accounts/aawalton/settings.json". So the estate's one check on registry agreement compares `settings/agents.json` against the copy, and no check compares the copy against the original it was made from.

The failure this admits is the one `hooks-agree` was written for and states in its own header: what doubles is silent, and a hook that fires twice logs nothing and returns the same verdict twice. A tier that silently stops tracking is the same class of fault one level up.

Found while reading the hook registry for the agent-harness seam, not by anything that watches for it.
