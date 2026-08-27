---
id: 865bbdc0-ccba-5c26-b0a1-5a6733992aff
page-type-slug: finding
title: "Last hook wins updated input"
domain-slug: domain/agent-harness
---

# Claim

The last PreToolUse hook to answer a tool call decides its `updatedInput`, so a hook that rewrites the input loses that rewrite whenever another hook matching the same call answers after it — and which of two hooks answers last is not stable between runs.

# Evidence

Measured 2026-08-04 on `claude` 2.1.219, on two isolated sessions carrying the same two PreToolUse hooks and nothing else: one registered under the empty matcher, returning `permissionDecision: allow` with an `updatedInput` prepending an environment assignment to the command; one registered under `Bash`, returning `permissionDecision: allow` and no `updatedInput`.

In the first session the `Bash`-matched hook answered first and the empty-matcher hook second, and the subagent's shell ran the rewritten command — `SAW=ab37ba81e26b2045b` came back. In the second the order was reversed, and the shell ran the original — `SAW=` came back empty. Both sessions recorded the empty-matcher hook emitting the identical `updatedInput`, and the client's own `hook_response` events confirm it received that output in both. Nothing rejected the rewrite; a later answer replaced it.

The order is what changed, and nothing in either session's configuration asked for one order or the other. Neither the hooks' own output nor the client's hook lifecycle events report that a rewrite was dropped, so a hook that rewrites input reads as working on every run where it happens to answer last.

This bears on `tools/hooks/hold-identity.ts`, whose empty matcher is what fires first, and on the four `Bash`-matched hooks the fleet settings file registers beside it. The reasoning that an empty-matcher hook is the safe place to hand something to a shell rests on firing first, and firing first is the position that loses.

Both sessions were run through `tools/hook-bench.ts`; the run directories hold the hook payloads, the client's stream and the transcripts.
