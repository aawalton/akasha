---
id: aedb01e8-372d-5cc2-ae35-f16adba9dd86
slug: account-skills-links-outlive-retirement
page-type-slug: finding
title: "Account skills links outlive retirement"
domain-slug: domain/agent-harness
---

# Claim

Eight per-account `skills` symlinks outlived the skills chain that #17353 retired, each dangling at a path nothing declares, so restoring that one path re-arms the quarantined skill tree on every account at once and no instrument is watching the link.

# Evidence

Measured 2026-08-07 under `/home/walton/.claude/accounts/`, while emptying `dirty/code/docs-symlinks.md`.

Every one of the eight account directories — `aawalton`, `aine`, `alanwalton`, `amywalton`, `aow`, `audhdalan`, `ctw`, `tempereso` — carries `skills -> /home/walton/.claude/skills`. That target does not exist, so all eight resolve to nothing today and nothing is loaded through them.

They are outside what any instrument examines. `packages/shared/utils/system/src/symlink-integrity-decide.ts` parses `link "<target>" "<linkPath>"` calls out of `setup-symlinks.sh` and its header says it does this rather than re-declaring the chain, so its denominator is exactly the links that script declares. `setup-symlinks.sh` names no account path at all — `grep -n accounts` over it returns nothing — so these eight are neither `scanned` nor `unexaminable`, and `ops seat reap` reports drift "across N declared symlinks" over a set that never held them.

`dirty/code/docs-symlinks.md:48` asserted the opposite outright: "The account `skills` base was the third hop of the retired skills chain and went with it." The hop it names is the one still standing.

This is the shape `user-tier-symlink-outlives-its-target.md` records one path of, and it is a second path rather than the same one. That finding is about `accounts/aawalton/settings.json`, one link under one account, and its closing line scopes itself to what #17852 touched. These are eight links under a different retirement, #17353, and the target that would arm them is a directory rather than a settings file: writing `~/.claude/skills` once puts the quarantined skill tree back on every seat's loading path in one act, which is the state the retirement was for.

Not measured: whether anything in the estate still creates `~/.claude/skills`.
