---
id: 150124c3-3694-5344-ab09-e2ca8c1dce5a
page-type-slug: finding
title: "Global intent about one repo"
domain-slug: domain/global
---

# Claim

`domains/global.md` carries a single Intent entry, and it is a claim about one repository rather than a state of the concern every domain sits inside.

# Evidence

The entry is "Only code deployed off this workstation stands in the code repository", read on 2026-08-16. Raised by the review of `domains/global.md` on 2026-08-15, which left it standing: it is live and unmet — `packages/shared/cli/src/ops/` sits in the code repository while `domains/ops-cli.md` says that repository should hold no part of a command but the functions it calls — and it restates neither `domains/repos/instructions-repo.md` nor `domains/repos/code-repo.md`. The reviewer reports the case against moving it too: `code-repo` sits under `code` and `instructions-repo` under `agent-harness`, so global is their nearest common ancestor and the only document able to carry a claim about the boundary. Removing it without a replacement would destroy a claim nothing else states, and writing that replacement is a changed line on another domain. Where the entry should sit was not judged, here or by the reviewer.
