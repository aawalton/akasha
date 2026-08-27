---
id: 78fb9111-ead0-5579-beec-77d003883321
slug: bash-env-merge-precedence-unmeasured
page-type-slug: finding
title: "Bash env merge precedence unmeasured"
domain-slug: page-type/refusal
---

# Claim

The two bash-env refusal bodies that carry a declaration — `bash-env-unresolved` and `bash-env-outside-repo` — assume this repository's `settings/agents.json` is the declaration in force, and nothing in the repo establishes how `env.BASH_ENV` resolves when the user tier declares one too.

# Evidence

Measured 2026-08-11, across three `review-instructions` readings of the bash-env refusal family dispatched from `review-documents`. The third named the fork and scoped it; the sources below were read here.

A second settings tier exists: `tools/checks/hooks-agree.ts` — now `tools/audits/hooks-agree.ts:13` — documents `$CLAUDE_CONFIG_DIR/settings.json` falling back to `~/.claude/settings.json`. Two readings in this family repaired bodies for claiming a state of the world one file cannot settle, on exactly that ground, and `pages/refusal/bash-env-settings-absent.refusal.md` and `bash-env-undeclared.refusal.md` both carry the repair today, each closing on "unless `~/.claude/settings.json` declares BASH_ENV instead".

What the repo does establish is the merge for hooks, not for env. `tools/lib/hook-merge.ts` measures it by controlled probe: Claude Code unions hooks across every tier and deduplicates on byte-identical string equality, so a hook both tiers register under two spellings runs twice. That is a union rule for a list. `env.BASH_ENV` is a scalar, where a union has no meaning and one tier must win.

Nothing in the instructions repo measures which. `tools/checks/bash-env-inside.ts` reads `settings/agents.json` alone — its own test is named "nothing here reads a second one". Nothing in akasha measures it either: that check is `tools/audits/bash-env-inside.ts`, which still reads only `SETTINGS_PATH` from `checks-system` hook settings, and `tools/tests/bash-env-inside.test.ts:76` still carries that test name verbatim. `tools/lib/hook-merge.ts` still measures the list union for hooks and nothing for a scalar.

Where it bites: only on the two bodies whose arms fire on a declaration that exists here — `pages/refusal/bash-env-unresolved.refusal.md` and `bash-env-outside-repo.refusal.md`, both still standing and both still naming `settings/agents.json` alone. `bash-env-settings-absent` and `bash-env-undeclared` have no declaration to lose a merge with, so the question cannot reach them, and `-settings-unreadable` claims nothing about the world at all.

Not measured, by any of the three readings or here: which tier actually wins for an env key. No probe was run. What stands is that the two bodies assert a consequence resting on an answer nobody has taken.
