---
id: 55880990-3c8c-5475-98c8-1ac73715815d
slug: perimeter-key-excludes-what-binds-hardest
page-type-slug: finding
title: "Perimeter key excludes what binds hardest"
domain-slug: domain/agent-harness
---

# Claim

As of 2026-08-02, `domains/agent-harness.md`'s governing key (`instructions-path: "**/*.md"`, no `code-path:`) named none of the surfaces that bind an agent hardest — `~/code/.claude/settings.json`'s hooks, `BASH_ENV`, `ops agent`, the supervisor package — nor claimed `settings/agents.json`/`settings/subagents.json` on its own side; a same-day re-derivation confirmed every figure but found the row's own central claim ran backwards.

# Evidence

Project #17479, domain `agent-harness`. Cut by `athena-lead` against `initiatives/agent-harness.md` objective 4 — "Every surface an agent loads is named on the perimeter." Measured firsthand 2026-08-02, re-derivable.

**The gap.** `domains/agent-harness.md` defines itself as "everything that binds an agent: the surfaces it loads, the machinery that delivers and refuses them, and the flow its work is carried along," but declares `instructions-path: "**/*.md"` and no `code-path:` — so its key selects markdown in this root only, while what binds hardest is neither.

**Undeclared today:** `/home/walton/code/.claude/settings.json` (19 hooks across 7 event kinds: PreToolUse 10, PostToolUse 1, Notification 1, PermissionRequest 1, SessionStart 1, UserPromptSubmit 3, Stop 2; also `env`, `permissions`, `statusLine`); `BASH_ENV` = `$HOME/code/packages/shared/dotfiles/bash-env.sh` (1,539 bytes); `ops agent` (54 subcommands); the supervisor package; `/home/walton/code/.claude/deliberately-undeclared-control/` (two documents whose directory name asserts out-of-scope).

**On this side but unclaimed:** `settings/agents.json` (5,374 bytes), `settings/subagents.json` (1,040 bytes, declaring `general-purpose`/`claude`) — no schema claims them. `~/instructions/.claude/` holds zero files.

**Left for a definition reading:** whether "named on the perimeter" means declared, governed, or checked; whether this needs `code-path:` widening first; what `deliberately-undeclared-control/` is for; whether the row should split.

**2026-08-02 exploration (define worker, claude, headless):** every number above re-derived clean. Then "## [DISAGREES] The central claim is backwards" — capture cut at a paragraph boundary right after, so the disagreement's content is not preserved here.

Superseded: replaced by three children, #17489, #17490, #17491 — see #17489: "Cut by athena-lead as the first of three children under #17479. It replaces that row's R1, whose criteria were falsified before it was dispatched."
