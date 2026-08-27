---
id: 5b106a7d-0aba-5332-973e-85a0aae0ffed
slug: quarantined-doc-cited-by-path
page-type-slug: finding
title: "Quarantined doc cited by path"
domain-slug: domain/global
---

# Claim

Two source comments in the code repository cite `packages/shared/cli-core/CLAUDE.md`, which that repository quarantined into the instructions repository at `7205e28efd` and no longer holds.

# Evidence

The two sites are `packages/infra/checks/src/checks/check-verdict-coverage.ts:31` ("Authoritative doc: packages/shared/cli-core/CLAUDE.md.") and `packages/infra/checks/src/lib/check-configs-source-scanners.ts:316` ("See packages/shared/cli-core/CLAUDE.md."). The path resolves to nothing in either repository: the file now sits at `dirty/code/packages-shared-cli-core-claude.md` in the instructions repo, under quarantine, where it carries no domain slug and nothing resolves it by name.

The class was already ruled on in the same family of commits that stranded these. `cf7670c96d` states that the code repository "cites the instruction estate by the durable names its registries resolve rather than by path, because the two trees land on different clocks — an address across that boundary breaks with nothing raising it, and the one instrument watching them counted only the addresses that had already died." These two are addresses of exactly that kind, surviving that pass.

What a repair turns on, and why this is filed rather than made: there is no durable name to repoint to. The doc is quarantined, so no registry resolves it, and choosing between reviving it, naming it some other way, and deleting the citation is a judgment about where the verdict-channel doctrine now lives.

Found while landing #17938, which edits the header of the first of the two files.
