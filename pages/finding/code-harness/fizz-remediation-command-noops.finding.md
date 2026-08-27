---
id: 6743f97c-582f-535a-a347-cbc8e458d496
slug: fizz-remediation-command-noops
page-type-slug: finding
title: "Fizz remediation command noops"
domain-slug: domain/global
---

# Claim

`check-fizz-subset`'s failure output tells the reader to run `bun packages/shared/fizz-compiler/src/compile.ts` to regenerate, but that module has no main entrypoint, so the command exits clean and writes nothing.

# Evidence

Found by worker-16287 during #16287, flagged up rather than folded in.

THE GAP. `check-fizz-subset`'s failure output instructs: "Regenerate with: bun packages/shared/fizz-compiler/src/compile.ts." That module has no main entrypoint, so running the documented command executes, exits clean, and writes nothing. The agent re-runs the check, sees the same failure, with no signal the remediation never ran.

WHY IT EARNS A ROW despite being small: same class as every other defect found on 2026-07-25 — an instrument that appears to act and does not. A remediation command that silently no-ops is worse than no command: it consumes the reader's trust and terminates their search for an alternative. The failure presents as "the check is wrong" rather than "the fix did not run."

WORKAROUND IN USE: a one-off `compileSource` call. Fine for the immediate need, not the fix.

CANDIDATES: (a) give `compile.ts` a main entrypoint so the printed command does what it says; (b) change the printed command to whatever actually works. Prefer (a) — the instruction is the natural one and a reader will try it whether or not the text changes.

Also worth checking whether any other check prints a remediation command that no-ops; if this is not the only one, the generalizable fix is a test that every printed remediation command is executable.

Was #16291.
