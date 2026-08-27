---
id: e0c503a1-4472-5329-bfcc-067c2453b413
page-type-slug: finding
title: "Unix philosophy citations dangle"
domain-slug: domain/code-quality
---

# Claim

Fourteen live source files name "Unix Philosophy" as the authority behind what they do, and no live document by that name exists.

# Evidence

`grep -rln 'Unix [Pp]hilosophy' --include='*.ts' packages/`, with `node_modules` and `dist` excluded, returns fourteen files: five in `shared/cli-core/src/` (`exit.ts`, `exit.unit.test.ts`, `help.ts`, `list-bound.ts`, `read-stdin-or-file.ts`), three in `infra/checks/src/`, and one each in `infra/k8s/cli`, `infra/loki/cli`, `alanwalton/projects/cli` (two) and `alanwalton/mobile-cli` (two).

The citations are load-bearing rather than decorative. `check-cli-positional-alias-coverage.ts` and its pure core both declare `Authoritative principle: Unix Philosophy`, and that core opens by grounding the gate itself: "Root `CLAUDE.md` and Unix Philosophy state as universal that an identifier arg is accepted both positionally and as its named flag." `exit.unit.test.ts` pins the exit vocabulary under a test literally named `canonical codes match Unix Philosophy`. `list-bound.ts` cites `Unix philosophy › Announce Every Bound`, and `read-stdin-or-file.ts` cites the section by heading: `Convention (from Unix Philosophy, "Structured Input via stdin")`.

Neither document those two name is live. `dirty/docs/unix-philosophy.md` was ingested a block at a time and removed; one section survived and stands quarantined at `dirty/maybe-keep/docs/unix-philosophy.md`, binding nobody. The root `CLAUDE.md` is quarantined too, as `dirty/code/claude.md` — `~/code/CLAUDE.md` does not exist.

Nothing in `domains/` carries the name, and there is no `cli`, `tool`, `verb` or `command` domain for one to resolve into.

What is left is a gate stating its own warrant and pointing at nothing, which reads exactly like one whose warrant a reader could go and check. The claims themselves mostly survive elsewhere — the exit vocabulary in `exit.ts`'s own header, the bound rule as **Population** on `domains/instrument.md` — so this is a citation question rather than a rules question.
