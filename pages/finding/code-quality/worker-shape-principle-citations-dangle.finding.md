---
id: 82a8441a-decc-5f3c-9069-beac5a27a778
slug: worker-shape-principle-citations-dangle
page-type-slug: finding
title: "Worker shape principle citations dangle"
domain-slug: domain/code-quality
---

# Claim

123 comments across the code repo defer to a principle called "Long-Running Worker Shape", and 2 of them cite it by path as `docs/long-running-worker-shape.md`. No file of that name exists anywhere in the code repo, and `~/code/docs/` is not a directory. The document those comments defer to was under quarantine in the instructions repo and has now been ingested and removed, so every one of the 123 now names a principle a reader cannot open.

# Evidence

Measured over `~/code`, excluding `dist` and `node_modules`:

- `grep -rn "Long-Running Worker Shape" --include=*.ts packages/` — 123 lines.
- `grep -rn "docs/long-running-worker-shape.md" --include=*.ts packages/` — 2 lines, in 2 files.
- `find . -name "long-running-worker-shape.md"` — no results.
- `ls ~/code/docs` — "No such file or directory".

The citations are load-bearing rather than decorative. `packages/infra/checks/src/checks/check-worker-shape-detect.ts` carries one inside the allowlist that decides which workers the check exempts: `// see docs/long-running-worker-shape.md — pure-polling-loop variant`, above `ALLOWLISTED_BASENAMES`. The allowlist's own docblock defers the rule to that document too — "Each variant has exactly one canonical example documented in the principle doc; the allowlist is intentionally closed to that pair." So the reason a worker is exempt from a live check is held in a document that is gone.

`packages/shared/worker-runtime/src/measure-loop-iteration.ts` ends its docblock the same way: "See Long-Running Worker Shape for the principle and label conventions." `run-long-running-worker.ts` opens by naming the principle as what it composes.

The source document was `~/instructions/dirty/docs/long-running-worker-shape.md`, emptied and removed by the `ingest-instructions` run of 2026-08-07. Its removal is what makes the count total rather than partial; the path citations were already dangling before it, since the code repo has had no `docs/` directory.
