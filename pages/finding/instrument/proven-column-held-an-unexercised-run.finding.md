---
id: b51d9d13-4d0b-5399-957b-82887fed8033
slug: proven-column-held-an-unexercised-run
page-type-slug: finding
title: "Proven column held an unexercised run"
domain-slug: domain/instrument
---

# Claim

A message deliberately partitioned into what was proven and what was not still placed a claim in the proven column on the strength of runs that never exercised it — 20 recorded runs that read a tree off the filesystem, cited as proving a CLI spawns from that tree. Partitioning evidence by confidence does not catch this, because the misassignment happens inside the partition. Naming what each run *exercised*, rather than what it establishes, is what would have caught it.

# Evidence

2026-08-14, settling #19089's seam: how a code-repository check reaches an instructions command from a CI step pod.

The answering message was unusually careful. It carried the headings "Proven" and "Not proven". Under *not proven* it placed bare `ops` on a pod's PATH, with the right reason: `instructions-owner.ts` spawns exactly that, but its only caller reports zero runs, so the spelling has never executed in a pod. Correct instinct, correctly applied.

Under *proven* it placed the tree's presence: `pod-spec-env.ts` sets `INSTRUCTIONS_ROOT` on every step pod unconditionally, and `check-cli-help-flag-references` has 20 runs resolving the tree that way in a pod. Both true.

It then recommended `bun "$INSTRUCTIONS_ROOT/tools/ops/cli.ts" <verb>` as needing "only `bun` and the env var, both proven by those runs."

They are not. Every one of those 20 runs reads the tree off the filesystem; none spawns the CLI. They establish that the tree is present at a known path in a pod, and nothing about whether a verb runs there.

Found by probing rather than reading. With `HOME` pointed at an empty directory: with `CODE_ROOT` set the verb runs; without it, exit 70, `UNREACHABLE_CODE_REPOSITORY`. The cause is `tools/lib/code-root.ts` — `process.env.CODE_ROOT ?? "${HOME}/code"` — resolved at CLI boot before any dispatch, so a pod having no `~/code` cannot run a verb at all on the recommended spelling.

That probe no longer reproduces. `tools/lib/code-root.ts` stands, but the `code` repository is gone and the function now falls back to `ownRepoRoot()` and disregards a `CODE_ROOT` naming a directory that is not there. What is unrepaired is the reasoning gap below, not the boot path: on 2026-08-27 nothing across the 1162 tracked `*.domain.md`, `*.page-type.md`, `*.command.md` and `*.role.md` pages states a rule for naming what a cited run exercised.

What makes this worth filing rather than correcting quietly: the discipline was the right one, applied by an author who had just used it correctly on the adjacent item in the same message, and it did not work. A proven/unproven split sorts *claims* by confidence and never asks what the cited run touched. The gap between "20 runs resolve the tree this way" and "20 runs spawn the CLI this way" is invisible to that sort, and immediately visible to the question "what did the run execute?"

Filed rather than repaired: the remedy is a wording rule for citing a run as evidence, and where it belongs is nobody's judgment yet.
