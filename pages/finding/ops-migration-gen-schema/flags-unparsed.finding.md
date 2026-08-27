---
id: 04de42a2-9ceb-5add-b056-74077a8febf9
slug: flags-unparsed
page-type-slug: finding
title: "Flags unparsed"
domain-slug: domain/global
---

# Claim

`ops migration gen-schema` parses no arguments, so a flag it does not declare is ignored rather than refused, and it accepts a `-v` alias its help does not mention.

# Evidence

The body scans the raw argument list with `args.includes("--verbose") || args.includes("-v")` and forwards at most `--verbose` onward. It never calls the shared `parseArgs`, which every other verb under `tools/commands/migration/` does, so no declaration in its help block is enforced at this layer.

Its help declares exit `1  input error (missing DATABASE_URL or unknown flag)`. The unknown-flag half is levied only by the inner `main`, which receives a list the caller never typed into — at most the single token `--verbose`. `-v` stands in no `flags:` entry.

Observed 2026-08-13 while moving the verb's body. The construction was carried across unchanged rather than repaired, a change made while moving a body being indistinguishable afterwards from the move.
