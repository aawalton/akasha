---
id: 5134cb05-0b74-567e-b20c-c2ee32f50b99
slug: command-parts-and-flag-record-still-short
page-type-slug: finding
title: "Neither ops-cli Intent entry is true yet, and both remainders are nameable"
domain-slug: domain/ops-cli
---

# Claim

Neither Intent entry is yet true, but both are close and the remainders are nameable. "The code repo holds no part of a command but the functions it calls" now fails in three places only: the global help and version flags, two whole tracking commands standing duplicated, and an unreached command-registry builder. "How often each ops command runs, and how often each of its flags is used" splits: run counts are answerable today from 1.7M metric rows, flag usage is recorded nowhere at all.

# Evidence

Measured 2026-08-20T14:41-14:48Z. The metric counts are mine, RUN with psql; the code-repo readings are a delegate's, and I re-ran the load-bearing ones.

On the first entry. `code:packages/shared/cli/src/ops/` — the path this domain names — now holds exactly two files, `emit-metric.ts` and its unit test, and neither is a registry, a dispatcher, argument parsing or help text. Dispatch and declaration stand in `tools/ops/cli.ts`, `dispatch.ts` and `declared.ts`, which walk `tools/commands/**` off the filesystem.

Three remainders stand, all outside the declared `code-path`:

`code:packages/shared/cli-core/src/help.ts:56,59` declares `HELP_FLAGS = ["--help","-h"]` and `VERSION_FLAG`, read by name at runtime from `tools/ops/code.ts:84-85` and consumed at `tools/ops/dispatch.ts:14,18,51`. These are flag names and help text, not functions. Both lines carry an `ast-unused: keep` note saying the dispatcher reads them by name.

`code:packages/alanwalton/daily-tracking-cli/src/safety.ts` carries `const help: CommandHelp` at line 14 and `export default async function trackingSafetyCommand` at line 93 — a whole command, duplicating `tools/commands/tracking/safety.ts`. Its sibling `delete.ts` does the same. Instructions reaches both files legitimately for one function apiece, but each carries a command alongside it.

`code:packages/shared/pages/cli/src/entity-surface/index.ts:56` returns a `readonly Command[]` and builds its own help; it has no production caller in either repo.

On the second entry. `public.metrics` holds 1,742,099 rows of `ops.command.duration_ms`. Run counts are answerable and I ran them: `instructions init` 80,028, `db psql` 76,594, `instructions write` 71,586, `voice run` 63,572, `agent reap` 45,112. The distinct label keys over that whole set are branch, checkout, exit_code, namespace, retired_status, retired_status_agent, seq, success, verb. No key names a flag, so no query over this record can answer how often a flag was used.
