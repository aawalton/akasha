---
id: e8959310-1177-5825-a340-8fe322723880
slug: stale-bundles-predate-file-backed-reader
page-type-slug: finding
title: "Stale web bundles predate the file-backed page reader"
domain-slug: domain/deploy
---

# Claim

All four page-serving web pods run code in which the file-backed page reader does not exist at all, so the live site resolves a page type only from the 17 surviving `pages` rows and 404s every other listing route. A deploy is necessary but not sufficient: of the 48 retired page types, 36 carry a listing URL, and only 12 of those resolve once the current source ships. The other 24 stay broken afterwards, which will read as a failed deploy rather than a missing repoint.

# Evidence

The `alanwalton/web`, `alanwalton/atlas`, `temper/web` and `archive-of-worlds/web` pods run `1c997ccde3c8` (2026-08-18 17:04), read out of the pods. They are 38-42h old and clone `main` from the in-cluster git server. `origin/main` is `e93bc5ba14`, local `main` 414 ahead, so a deploy needs a push first.

At that commit `pages/access/src/` has no `file-read.ts`, `file-rows.ts`, `file-shape.ts` or `file-narrow.ts`; `getPages` is pure Supabase and `getPageTypeByPluralSlug` queries `pages` only, where current source tries `pageTypeFromFiles` first. `PAGE_QUERY_ORIGIN` is unset in all three deployments.

Two breaks exceed any single retired type. `pages` holds zero `nav` and zero `view` rows, and no `nav` or `view` page-type row in any state; the deployed `_app-layout.tsx` and `use-app-nav-items.tsx` both query `pageTypeSlug: "nav"`, so every sidebar is empty and every `/nav/<slug>-<idSuffix>` bookmark renders an untitled empty shell, not a 404. The deployed `routes.ts` has no `api/pages/:pageTypeSlug`, so that endpoint 404s for live and retired slugs alike.

Post-deploy resolution was run against the live query service: 12 resolve (`errors`, `topics`, `automations`, `character-builds`, `companion-builds`, `ctw-achievements`, `ctw-teams`, `idle-persona-cards`, `story-chapter-images`, `temper-build-versions`, `temper-companion-skills`, `temper-completed-tasks`). 24 do not: `domains`, `initiatives`, `migrations`, `royal-road-accounts` and `temper-character-skill-activations` state no `plural-slug`, and `articles`, `helpers` and the `ctw-profile*` set have no file.

Retired types are still named by deployed readers: `AUTOMATION_SLUG` is awaited on the sign-in hydration gate in all four auth providers, and temper's `hooks-pages-resolver.ts` reads `temper-build-version` and `temper-completed-task`.

Not observed: every app route redirects to `/sign-in`, so no signed-in rendering was seen. The 404s come from the deployed source and measured row state, not a rendered page.
