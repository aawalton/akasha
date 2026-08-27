---
id: de9fbb4a-f96f-58c4-bac6-7d6b36fd2389
page-type-slug: finding
title: "Subprocess killed not timeout"
domain-slug: domain/code-quality
---

# Claim

Bun's `subprocess.killed` is true for any process that is no longer running, not only one that was killed, so a subprocess wrapper testing it to detect its own timeout reports every fast, correct refusal as a timeout and discards the diagnostic the child already wrote.

# Evidence

Two independent implementations in this fleet hit this on the same day, 2026-08-11.

The first was `athena-manager`'s caller, written that morning. The second was `tools/lib/code-bridge.ts` under #18798, written that afternoon with no knowledge of the first. Both spawned a child with a wall-clock ceiling and both wrote the same guard, in the shape `if (child.killed && exitCode !== 0) throw new Error("did not answer within Nms")`.

In `code-bridge.ts` the symptom was that a bad module specifier and a missing export — each of which the child refused correctly in about 50ms, writing an actionable message to stderr — both came back to the caller as `did not answer within 30000ms and was killed`. The child's own diagnostic was never read, and the reported cause was the opposite of the real one: the process had exited immediately rather than hung.

The remedy in both cases was to stop asking the child and track the ceiling locally — a `let timedOut = false` set inside the `setTimeout` callback and nowhere else, so the flag is true only where the ceiling actually fired.

WHAT MAKES THIS WORTH FILING RATHER THAN FIXING TWICE MORE is that the fault is invisible to a test that exercises a SUCCESS. Both implementations passed their happy-path checks. It surfaces only under a case where the child refuses fast and the wrapper is asked what happened — so a suite that never exercises a refusal cannot see it, and the wrapper looks correct in review because the guard reads as careful.
