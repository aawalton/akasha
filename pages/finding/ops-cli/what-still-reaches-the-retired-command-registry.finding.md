---
id: 3cca53ec-45e4-5366-a698-16346a4f885b
slug: what-still-reaches-the-retired-command-registry
page-type-slug: finding
title: "What still reaches the retired command registry"
domain-slug: domain/ops-cli
---

# Claim

Eleven sites in the code repository still reach `packages/shared/cli/src/ops/registry.ts`, and they do not all want the same treatment: six are checks whose replacements now stand in the instructions repository and which go, one is a check that should stay and repoint, and four are references to the path as a string rather than as a dispatch source.

# Evidence

Taken by grep over `packages/**/*.ts` excluding `dist/` and `node_modules/`, then read at each site to tell a live import from a mention in a comment. The bare `*/registry.ts` files under each product are sub-registries the top-level one aggregates; they name the path only in prose and are not consumers.

Replaced here, so the code-repo copy goes: `check-verdict-coverage.ts` (now `tools/checks/verdict-coverage.ts`), `check-cli-positional-alias-coverage.ts` (now `tools/checks/positionals-cover-identifiers.ts`), `check-cli-prose-flag-route-coverage.ts`, `check-cli-help-flag-references.ts`.

Goes without a replacement: `check-command-surface.ts` and `lib/command-surface/`. Their subject was a CI caching step over `/ci-storage/command-surface/<sha>.json`, and acquiring the surface in the instructions repository costs 215ms measured, so the cache has no subject left.

Stays and repoints: `check-no-prose-flag-teaching.ts`. Its population is documents rather than verbs, and it reads the database over three instructional page types, so it does not belong here. It needs two inputs repointed at the instructions repository: the prose-flag census, and the `cli-help` carrier it currently flattens out of the registry's help objects.

Path-as-string, needing only the citation moved: `audits/doctrine-path-citations.ts` line 78, `audits/ops-subject-census.ts` line 75, and the two assertions in `packages/shared/graph/producers/src/cli/producer.cli.test.ts` line 152 and `producer.unit.test.ts` line 100.
