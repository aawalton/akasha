---
id: 79382f70-ed13-5a46-83a2-b30b01b1cccf
page-type-slug: finding
title: "Bootstrap parses two undeclared flags"
domain-slug: domain/ops-cli
---

# Claim

`ops ci-workflows bootstrap` accepts two flags its declared surface does not carry. `--list` and `--exclude <csv>` both work today and are read by the code repository's own parser, not by the help block standing in `tools/commands/ci-workflows/bootstrap.ts`. This is what blocks that verb's body from moving: the move replaces the code repository's parse with the declared one, and the declared one has never heard of either flag.

# Evidence

Measured 2026-08-13 on the workstation, running `move-command-bodies` over the `ci-workflows` namespace.

What the surface declares. `tools/commands/ci-workflows/bootstrap.ts` declares one positional, `workflow`, and `flags: []`. Its whole body is `await runCodeVerb(HANDLER, args)`, which passes argv through untouched.

What the body actually parses. `HANDLER` is `packages/infra/ci/workflows/src/ci-workflows/bootstrap.ts`, whose body is `await main(args)`. That `main` lives in `packages/infra/ci/workflows/src/bootstrap-cli.ts` line 104 and opens `const { workflowName, exclude, list } = parseBootstrapArgs(argv)`, imported from `./bootstrap-args`. Neither `exclude` nor `list` is declared anywhere in this repository.

`--list` works. `ops ci-workflows bootstrap --list` exits 0 and prints `[bootstrap] Discovered 43 bootstrap workflow(s)` followed by a nine-workflow, three-layer chain table. Nothing refuses it on the way through.

Why the verb was handed back unmoved rather than forced. Moving the body means parsing through `lib/code-parse-args.ts` against the declared help, which would answer `--list` and `--exclude` with `unknown flag` and exit 1 — two working flags removed by a change whose stated purpose is to move a body. Declaring them here instead changes the verb's surface in the same act that moves its body, which the task bars, and a repair made there cannot be told from the move. Splitting `main` into a parse and an effect is a code-repository edit, which the task's first invariant forbids.

The other verb in the namespace, `ci-workflows generate-rbac`, has no such gap and moved.

Which of the two readings is right is not settled here. `--list` and `--exclude` may be surface the help block should have carried all along, or they may be leftovers from `bun run bootstrap` — the usage string `main` prints on an empty selection still reads `Usage: bun run bootstrap [name] [--exclude <csv>]`, naming the direct invocation rather than the ops verb. Nobody was asked which.
