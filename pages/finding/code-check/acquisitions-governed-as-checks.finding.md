---
id: 9f6d3736-3cde-5c26-97c1-2e80d68d4aa8
slug: acquisitions-governed-as-checks
page-type-slug: finding
title: "Two tree acquisitions sit under a document defining everything in it as a check, and neither is one"
domain-slug: domain/global
---

# Claim

Two tree acquisitions stand inside a directory whose governing document defines everything
in it as a check on a change, while neither is a check.

# Evidence

#19409 ruled that `check-instructions-tree` and `check-books-tree` were never checks: each
passed a literal `violations: []` to `exitOnResult`, neither was registered in
`check-configs.ts`, and what made them checks was a filename `isCheckScript` matched on. It
reclassified them to `packages/infra/checks/src/trees/acquire-instructions-tree.ts` and
`acquire-books-tree.ts`, out of the `check-` namespace and out of `run-check.ts` routing.

They still sit under `packages/infra/checks/**`, which `domains/code-check.md` declares as a
`code-path`. That document defines a code check as "a check on a change waiting to reach the
code repo's main", and carries rules written for checks — `Do The Work`, `Zero At Landing`,
`Dispatch Reach`, `Derived Reach`. All of them now govern two files that render no verdict.

Moving them out was not demanded by the intent #19409 quoted, so it correctly left them. The
open question is whether the acquisitions belong under a different path, or whether
`code-check.md`'s `code-path` should stop claiming the whole of `packages/infra/checks/**`.

Read on the `project-19407` branch at `e9efcd15bb`, before that branch reached main.
