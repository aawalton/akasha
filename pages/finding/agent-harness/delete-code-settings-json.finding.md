---
id: c0563d30-a6f8-5878-9e55-ae9b677f639b
page-type-slug: finding
title: "Delete code settings JSON"
domain-slug: domain/agent-harness
---

# Claim

`~/code/.claude/settings.json` was measured 2026-08-02 as a strict subset of `settings/agents.json` (19 hooks shared, 6 unshared, 0 divergences; permissions/env/statusLine identical) with zero unique registrations; Alan ruled it be deleted rather than kept in sync, which also requires removing its `setup-symlinks.sh:164` symlink and two documentation tables that name it.

# Evidence

Project #17491, domain `agent-harness`, created by `athena-lead`, third of three children under #17479.

Measured 2026-08-02: `~/code/.claude/settings.json` vs `settings/agents.json` — hooks 19 shared, 6 unshared, 0 divergences; `permissions` identical minus `Skill`; `env`/`statusLine` byte-identical; zero unique registrations — a strict subset. `block-instructions-direct-write.sh`/`block-instructions-direct-commit.sh` (this repo's write/commit refusals) are in `settings/agents.json`, not here — #17479 asserted the opposite, wrongly; caught on a later reading. `hooks-agree` compares two files; this is a third nothing compares against, so drift goes undetected.

Two remedies weighed: delete (absence changes nothing) or extend `hooks-agree` a third arm (visible drift). Turns on whether anyone hand-launches `claude` with cwd `~/code`, the only path the file is consulted from. Asked of Alan.

Alan answered 2026-08-02T13:15:16Z (question `019fc29c-5084-7870-a6fc-cea1277433b7`): "we should have a single settings.json that lives in the instructions repo and that should be used for both headless and (through spawn) interactive agents (through the bash aliases)." Remedy: DELETE. Supervisor already passes `~/instructions/settings/agents.json` as `--settings` on both rails (`supervisor-spawn-settings.ts:56` headless, `supervisor-interactive-spawn.ts:139` interactive); `cN` bash aliases already launch through it.

Deletion is not one file: `setup-symlinks.sh:164` declares `link "$CODE/.claude/settings.json" "$HOME/.claude/settings.json"`, parsed by `symlink-integrity` as canonical inventory. Two docs carry the same row: `packages/shared/dotfiles/CLAUDE.md:77`, `packages/shared/dotfiles/docs/dotfiles-symlink-architecture.md:30`.

Criteria: file gone; `hooks-agree`/`hooks-registered` still succeed; a launched agent still gets 25 registrations (baseline: 25 reaching 11 seats).

Do not touch `~/code/.claude/deliberately-undeclared-control/`, closed as a negative-space control for two declaredness gates.

Landing: `deploy`.
