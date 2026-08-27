---
id: cd2e4c9b-c03e-572e-a89e-708ab65587e2
page-type-slug: finding
title: "Prose in the code repo names ops commands that do not exist, and nothing checks a named command resolves"
domain-slug: repo/akasha-repo
---

# Claim

Prose in the code repository names ops commands that do not exist, and nothing checks that a name in a message resolves. Four were verified missing against the live registry: `ops pipeline redeploy`, `ops pipeline reset`, `ops person-authority grant`, `ops browser-test ensure-user`. `person-access` and `person-authority` are page types, never commands. `tools/ops/dispatch.ts` ends at `throw inputError("ops: unknown command")`, so following one met a second error atop the first.

# Evidence

The registry was built from `declaredCommands()` and `forwarderCommands()` in `~/repos/instructions/tools/ops/`, 423 command paths, and each name grepped against it. Found by walking the code repository for a different reason — clearing ops names — rather than by looking for dead names.

Not measured: how many command names stand in the instructions repository's own prose, its alert attachments, or its task documents, and how many of those resolve. One counter-example is already known: four alert attachments name `ops query-perf triage`, and no such command exists.
