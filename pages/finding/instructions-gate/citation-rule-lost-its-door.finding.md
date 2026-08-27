---
id: 089d83d7-6446-5ed1-9fe7-0ffe799c10e1
page-type-slug: finding
title: "Citation rule lost its door"
domain-slug: domain/global
---

# Claim

The source-position-citation rule has lost the consumer that reached this repository. `@agents/instruction-document/source-position-citations` still says its file walk lives in two consumers — the CI check and the `ops` command's citation rule — and only the check imports it, `packages/agents/instructions/src/lib/gate-citations.ts` being gone. No gate under `tools/gates/` carries the rule either, so nothing enforces it on a write here.

# Evidence

`packages/agents/instruction-document/src/source-position-citations.ts` closes its docblock with:

    Pure: content in, citations out. The file walk lives in its consumers —
    `check-source-position-citations` in `@infra/checks`, and the `ops` command's
    citation rule in `@agents/instructions`, which is why this grammar lives in neither.

Purity for two consumers is the stated reason the module has no walk of its own. Grepping `packages/` for importers of `@agents/instruction-document/source-position-citations`, excluding `dist/`, returns one file: `packages/infra/checks/src/checks/check-source-position-citations.ts`.

The second consumer is gone. `packages/agents/instructions/src/lib/` holds `frontmatter.ts`, `instructions-repo.ts`, `link-resolve.ts` and `scratch-tree.ts` with their tests, and no `gate-citations.ts`. Grepping the whole of `packages/` outside `dist/` for `declaresPinnedUpstream`, `treeCandidatePaths` and `isFindingsDocument` finds only the module, its own unit tests, and that one check.

Nothing on the instructions side took it over. `~/instructions/tools/gates/` holds twelve gates — document-conforms, domain-slug-stem, domain-slug-unique, hold-seat, hook-liveness, links-resolve, read-before-write, read-the-schema, read-what-governs, repo-agrees, token-ceiling, typecheck — and none is about citations. A write through `ops instructions write|edit` prints all twelve and no thirteenth.

So a position citation written into this repository is refused by nothing at the moment it lands, and is caught only when somebody runs `check-source-position-citations --root` against this tree by hand.

The claim has a second site: `check-source-position-citations.ts` itself opens “The rule and its three branches live in `@agents/instruction-document`, shared with the instruction tree’s own write gate so the two cannot disagree about what a citation is.” Module and consumer both describe the arrangement as live.

Read against the code repo working tree of 2026-08-07.
