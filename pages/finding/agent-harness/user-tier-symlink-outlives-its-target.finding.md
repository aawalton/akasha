---
id: 9a21cdc0-e899-56a1-b15c-abd20a7f11a9
slug: user-tier-symlink-outlives-its-target
page-type-slug: finding
title: "User tier symlink outlives its target"
domain-slug: domain/agent-harness
---

# Claim

The user-tier settings path for the account every seat runs under is now a symlink to a deleted file, so the tier is empty today and re-arms silently if anything ever writes that path again.

# Evidence

Measured 2026-08-05 while verifying #17852, which collapsed the fleet's hook registry to one source.

`CLAUDE_CONFIG_DIR` is `/home/walton/.claude/accounts/aawalton`, so the CLI's User tier for this account resolves to `accounts/aawalton/settings.json`. That entry stands, as a symlink to `/home/walton/.claude/settings.json`, which #17852 deleted. It resolves to nothing, which is why every instrument reads clean: `hooks-agree` reports not-applicable, its pair having ceased to exist, and `hooks-delivered` reads 19 live seats with none on the user tier.

Seven sibling account directories had their entries removed outright. This one was converted from a real file to a symlink first — repairing `one-account-settings-tier-is-a-copy-not-a-link.md` — and then its target went, leaving the link behind.

The claim #17852 bought is that exactly one loaded source carries a `hooks` key, which is what makes it impossible for a hook to reach a seat's union twice. That claim is a property of the filesystem rather than of anything declared: it holds only while no second source exists. A live symlink at the User-tier path is a standing route to a second source that needs no edit to any settings file to open — writing `~/.claude/settings.json` for any reason is enough, and nothing in either tree would report that the property had ended.

Not measured: whether anything in the estate still writes that path. `setup-symlinks.sh` no longer names it, and the supervisor's `SHARED_CONFIG_SYMLINKS` no longer carries it, both under the same row — but those are the two sites that row touched rather than the population.
