---
id: cdd7f88c-a412-5b94-b4bb-687ef59699a7
slug: rank-criterion-unstated
page-type-slug: finding
title: "Rank criterion unstated"
domain-slug: domain/global
---

# Claim

The `ranked` schema token orders rungs "most important first", but nothing states what importance is measured by, so a reviewer meeting an order that looks wrong cannot tell a defect from a judgment already made.

# Evidence

`tools/document/schemas/ranked.ts:30` reads: "Ranked, most important first. How many stand is the caller's and is stated at each use rather".

The rungs on `domains/agent-harness.md` stand in the order Single Authority, Headroom, Composed Outside. Headroom governs how a defect is reported. Composed Outside governs whether unvalidated instruction goes live for the whole fleet, and by the same surface's account is the only cover over a hole no gate can close — `tools/hooks/block-instructions-direct-write.sh` is registered on `Write|Edit`, a shell write is never offered to it, and a command that writes a file has no bounded spelling.

Raised by the `review-instructions` reading of `domains/agent-harness.md` on 2026-08-05, which did not reorder: nothing instrumental settles what "most important" ranks by, and a reorder on taste moves a surface every agent boots against.
