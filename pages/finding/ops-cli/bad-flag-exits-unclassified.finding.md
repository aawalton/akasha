---
id: eb229414-ffcd-5ef4-b074-dbc746001757
page-type-slug: finding
title: "Bad flag exits unclassified"
domain-slug: domain/ops-cli
---

# Claim

Two `ops enforcement` commands reject an unknown flag through an unhandled throw rather than the input-error path, so a caller mistake is reported as exit 70, the code reserved for a defect the CLI could not classify.

# Evidence

Measured by running `ops <command> --zz-not-a-flag` over the 720 commands held in the opsgen bad-flag capture, reading each exit code.

The distribution is 707 at exit 1, 5 at 2, 3 at 3, 3 at 70, 1 at 64, and 1 at 0 — so the exceptions are few enough to name.

The three at 70 are not one fault. `ci-workflows bootstrap` does not reject the flag at all: it runs, prints `Discovered 43 bootstrap workflow(s)`, then dies on `fatal: invalid reference: dd5aa3496a51f7f8e62871c6dc8d37116fb7e686` while creating a worktree. That is a stale reference in the environment, and the unknown flag never entered into it.

`enforcement list` and `enforcement new-rule` are the real case, and they behave correctly up to the exit code. Their output is `Unknown flag: --zz-not-a-flag`, which is the rejection the caller should get. `tools/commands/enforcement/list.ts:117` calls `cli.parseArgs(args, {...}, { passthrough: false })`, which throws on an unknown flag, and nothing between that call and the dispatcher catches it. `tools/ops/code.ts:72-95` classifies a throwable by testing `err instanceof inputError`, read out of the code repository's exit module; a throw failing that test falls to `UNCLASSIFIED_EXIT_HELP`. The rejection is right and only its classification is wrong.

Against the before capture at instructions commit `244a7e6d6`, both moved rather than regressed. `enforcement list` was exit 0, silently ignoring the unknown flag and running to completion printing `218 mechanism(s) across 4 source(s)`; `enforcement new-rule` was exit 2. Ignoring an unknown flag is the worse behaviour, so this improved and left a misclassification behind it.

The one command still at exit 0 is `migration gen-schema`, which reads the same in the before capture, so it is unchanged rather than new.

762 help captures and 720 bad-flag captures were taken for the after set, matching the before set one for one.
