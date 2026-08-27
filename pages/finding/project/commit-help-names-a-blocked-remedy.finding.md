---
id: bae0a07d-6b73-561e-8b4a-632d1d22d0e9
page-type-slug: finding
title: "Commit help names a blocked remedy"
domain-slug: barred-meaning/project
---

# Claim

`ops project commit --path` names `git reset HEAD --` as the remedy for a contaminated index, and that command is refused outright by the `block-destructive-git.sh` PreToolUse hook every agent runs under — so the verb's help offers an escape the environment forbids, and neither surface is derived from or checked against the other.

# Evidence

Measured 2026-08-07 while emptying `dirty/skills/agent-harness/findings/instruction-text-and-citations.md`, which recorded the shape on 2026-07-30; I re-ran its named surfaces rather than read them.

The help. `ops project commit --help`, paragraph 4: the verb refuses to run when the index holds staged paths outside the declared set "and names the contaminating paths so the caller can `git reset HEAD --` or include them in `--path`."

The prohibition. `tools/hooks/block-destructive-git.sh` blocks `reset` verb-only, any flavour, and is registered at `settings/agents.json:55` under `PreToolUse`. Fed the exact remedy — `echo '{"tool_input":{"command":"git reset HEAD -- packages/foo/bar.ts"}}' | bash tools/hooks/block-destructive-git.sh` — it exits 2 with `"decision": "block"`.

The refusal's own safe-alternatives list does not cover this case. Its four bullets offer an ephemeral worktree, `git show`/`ls-tree` for reading a revision, editing a file directly to revert it, and `bun ops project ...` for branch, rebase, force-push and integrate. None unstages a path, so an agent following the refusal from either side arrives nowhere.

The second remedy is live, which bounds this: including the contaminating paths in `--path` is permitted and works, so the agent is misdirected rather than cornered. Where the contamination is a leftover from an aborted run rather than a peer's live work, folding a stranger's paths into your own commit is the only move the pair of surfaces leaves.

Why nothing reports it: both sides are enumerable text — the hook's blocked verbs print via `--scope`, a verb's remedies sit in its help — and nothing reconciles them. The help is authored in the code repo; the prohibition is a hook in the instructions repo.
