---
id: 13769518-e7de-514a-8bba-03c94ca3077b
slug: page-type-forks-outrun-the-registry
page-type-slug: finding
title: "Page type forks outrun the registry"
domain-slug: domain/pages-system
---

# Claim

Nine page types are forked per account; the registry routing an account's imports names five. `resolveAccountPageTypes` maps Ki's id to `ki-book`, `ki-author`, `ki-show`, `ki-season`, `ki-episode`; the live rows `ki-book-series`, `ki-collection-template`, `ki-franchise`, `ki-movie` are reached by no entry, and eleven constants in source name the shared half of those pairs. Nothing compares registry, constants and rows, and the one instrument over declared slugs is DB-free and tests shape.

# Evidence

Read live 2026-08-07: `select title, string_agg(slug, ', ') from public.pages where page_type_slug='page-type' and deleted_at is null group by title having count(*) > 1` returns nine rows — Author, Book, Book Series, Collection Template, Episode, Franchise, Movie, Season, Show — each a bare slug beside a `ki-` slug, and nothing else doubled on title.

`packages/agents/routing-core/src/account-page-types.ts` declares `AccountPageTypes` with five members — book, author, show, season, episode — a `REGISTRY` holding one entry, and a resolver that throws for an account with none. So `ki-book-series`, `ki-collection-template`, `ki-franchise` and `ki-movie` are live page types nothing routes to.

Eleven constants name a bare slug from a forked pair, across eight files, by the predicate `_SLUG = "(book|author|book-series|...)"` over `packages/**/*.ts` excluding `dist`. Six of the eight sit under `packages/collections/books/`, among them `sync-kindle.ts:13`, `queries/book-series-query.ts:10` and `updates/update-book-series.ts:16-17`, all naming `book-series`. Eleven is a lower bound: an inlined literal is invisible to that predicate.

`packages/infra/checks/src/checks/check-page-type-slug-validity.ts` is the only instrument over source-declared page-type slugs. Its header calls it a "DB-free static check" re-running each declared slug through `pagesSeqName` for kebab shape, and names the two contexts it scans: `seedPageType(…, { slug })` fixtures and object literals carrying both `slug:` and `pluralSlug:`. Both are declarations. A consumer constant is in neither, and no arm reads a live row.

The comparison is not missing by oversight. `check-retired-status-source-vocabulary.ts` records that its own live-row half was removed at #17875 because Change Closure "refused them", and became `ops audit retired-status-rows`. So this belongs beside `ops audit grade-scale-drift`, which compares live `config.options` to a source constant. No such audit exists for page-type slugs.
