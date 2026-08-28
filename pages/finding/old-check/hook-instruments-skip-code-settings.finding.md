---
id: 6502a113-65ac-52a8-a289-7b991b13b11b
slug: hook-instruments-skip-code-settings
page-type-slug: finding
title: "Hook instruments skip code settings"
domain-slug: domain/old-check
---

# Claim

The four hook instruments in `~/instructions/tools/checks/` read the instructions root and the user tier, and none of them reads `~/code/.claude/settings.json` — which registers at least four live `PreToolUse` hooks. `check-hook-wiring.ts`, the one instrument measured reading that path on 2026-08-02, was deleted on 2026-08-04.

# Evidence

Measured 2026-08-04, firsthand, while re-running the evidence of `measured-narrow-concluded-wide`.

`~/code/.claude/settings.json` is 4,254 bytes and live: its `hooks.PreToolUse` registers `block-memory-writes.ts`, `block-instructions-direct-write.sh`, `block-direct-main-writes.sh` and at least one more, each commanding a script under `$HOME/instructions/tools/hooks/`.

`check-hook-wiring.ts` was deleted from `~/code` on 2026-08-04 in `c01917605a`, whose message reads: "The hooks left this tree on Alan's 2026-08-04 ruling (#17766), so the check that verified their registrations resolve has no subject here." The registrations did not leave; the scripts did. `check-configs.ts` today holds no `hook-wiring` node and no `settings.json` reference.

Of the four surviving hook instruments: `hooks-agree.ts` compares `settings/agents.json` under the instructions root against `$CLAUDE_CONFIG_DIR/settings.json`; `hooks-registered.ts`, `hooks-delivered.ts` and `hooks-fire.ts` each resolve against `estate.roots.instructions`.

WHAT THIS DOES NOT CLAIM. It does not claim nothing anywhere reads that file. The corpus swept is `~/instructions/tools/checks/` — four files. The `~/code` check corpus, the gate set and CI were not swept. `hooks-registered.ts:21` already declares "A `$HOME/code/…` REGISTRATION IS COUNTED AND NEVER VERIFIED", and `hooks-fire.ts:24` defers to it, so a deliberate exemption exists on the adjacent question and may exist on this one.

Whether that file is loaded by any seat is a separate question also not settled here: `supervisor-interactive.ts:76` sets every seat's cwd to `${HOME_DIR}/instructions`, and project settings load from the project directory.
