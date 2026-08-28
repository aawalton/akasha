---
page-type-slug: finding
id: c71099fe-a312-55a8-9138-eca7ca57dfa3
slug: verdict-turns-on-caller
title: "hooks-fire passes run alone and fails inside run-checks, naming two guards that are not broken"
domain-slug: domain/old-check
---

# Claim

`hooks-fire` gives a different verdict depending on how it is run. `bun tools/audits/hooks-fire.ts` on its own exits 0. The same audit inside `bun tools/run-checks.ts` fails, naming `block-headless-halt.sh` and `block-interactive-stall.sh` as having exited 0 where doing their job means exiting 2.

A check whose verdict turns on its caller cannot be acted on. It names two guards that are not broken, and a seat that runs the audit alone to confirm is told they are fine.

# Evidence

Measured on 2026-08-22 from the seat `athena`.

`bun tools/run-checks.ts` was run twice, minutes apart, with different machine load. Both runs failed `hooks-fire` with the same two probes named and the same message: "it exited 0 where doing its job means exiting 2". `bun tools/audits/hooks-fire.ts` was then run directly and exited 0, with 36 of 36 hooks probed.

The two probes stub the decider rather than calling it. `tools/lib/hook-probes-shell.ts` writes a fake `bun` into the scratch world's `bin` and puts it first on `PATH`; `dotfiles/bin/ops` ends in `exec bun "$dispatcher"`, so `ops instructions turn-end-decide` inside a probe reaches that stub. The stub ignores stdin and prints one fixed refusal line. Run by hand that path answers in 4ms. So neither probe reaches `tools/turn-end-decide.ts`, the reading, or the questions at `turn-end/reading/*.md`, and no change to those can move this verdict either way. That is why this is filed rather than treated as fallout from the reading questions changed the same afternoon.

The probe runner at `tools/lib/hook-probe.ts` hands each probe `HOME`, `INSTRUCTIONS_ROOT` and `CODE_ROOT` pointing into a scratch world, over a copy of `process.env`. Where the two callers differ in what they pass is the obvious place to look and is not established here.

Not measured: which of the two callers is right. The direct run may be passing because its world is more complete, or the run-checks run may be failing for a reason that would also bite a real turn end. Nothing here says the guards are sound — only that these two runs disagree about them. Also not measured: whether the other 34 probes are exposed to the same difference, or only these two.

Two other checks failed in both runs and are not this: `checks-ceiling` at 77.6s and 79.4s against a 60s ceiling, and `suite-runs` finishing 0 of 395 files inside its budget.
