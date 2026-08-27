---
id: 41ff74d6-09d1-54b9-92fa-daa342d8f24f
page-type-slug: finding
title: "Tier1 worktree duplication"
domain-slug: domain/agent-context
---

# Claim

Claude Code's ancestor-walk loader injects the Tier 1 Global Principles file twice, and injects a stale copy of it, in every worktree session, because the worktree's own checkout of .claude/CLAUDE.md is a different inode from the one ~/.claude/CLAUDE.md's symlink resolves to in a plain checkout, so no dedupe happens.

# Evidence

Observed via a throwaway capture proxy in front of the oauth-proxy, 2026-07-25 (untracked scratch /tmp/nimue-cap; required `env -u ANTHROPIC_UNIX_SOCKET` — that socket takes precedence over ANTHROPIC_BASE_URL, and otherwise the probe captures nothing).

Root cause: Claude Code walks up from cwd to /, loading <dir>/CLAUDE.md and <dir>/.claude/CLAUDE.md at every level — ~/.claude/CLAUDE.md loads because $HOME is an ancestor of cwd, not for any special user-memory status.

Four captured cases: ~/code -> 2 files (deduped, same inode as symlink target ~/code/.claude/CLAUDE.md); worktree -> 3 files (~/.claude/CLAUDE.md, <wt>/.claude/CLAUDE.md, <wt>/CLAUDE.md — no dedupe, different inode, and the worktree copy is the branch's stale checkout not main's); plain dir under $HOME -> 1 file (predicted, confirmed); git repo outside $HOME -> 0 files.

Worktree #16261 (byte-identical to main): 'Build deep modules with shallow interfaces' and 'Check the Restraint' each occur 2x; payload arithmetic msg0 = 77,264 chars = three files (76,406) + ~858 wrapper. Cost: ~7,800 Opus-5 tokens duplicated per worktree session, where nearly all project work happens. Worse: worktree #11682's copy differs from current — missing 'Check the Restraint' entirely and wording other principles differently, so the agent silently carries two diverging copies of its own governing doctrine.

Second defect, same mechanism: .claude/CLAUDE.md asserts Global Principles load 'regardless of working directory... because this file is the user-memory CLAUDE.md' — false; any agent with cwd outside $HOME gets zero Global Principles (not biting today: agents run under ~/code and ~/projects/*/worktree).

Intent recorded: make Tier 1 load exactly once, always current. Direction sketched (worker owns final design): move the repo-side file off the auto-loaded path, with ~/.claude/CLAUDE.md symlinked to it — so ~/code and a worktree each get it once, always main's current copy.

Was #16279, domain agent-context.
