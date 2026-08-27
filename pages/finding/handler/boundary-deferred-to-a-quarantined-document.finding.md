---
id: 6a94fdc2-bd07-509d-92c3-7328105ff918
page-type-slug: finding
title: "Boundary deferred to a quarantined document"
domain-slug: role/handler
---

# Claim

`KI_HANDLER_SPEC` defers Ki's authorization boundary to a document that binds nobody. Its `bootPrompt` comment says "The `ki` domain document carries the surface she is authorized to reach", and that document is `dirty/skills/ki/SKILL.md`, quarantined and queued for removal. The spec's own `stateAuthority` states the boundary as "books/anime/reviews", prose that maps ambiguously onto both the shared page types and the nine `ki-*` ones — and nothing refuses a write outside either set.

# Evidence

Measured 2026-08-07 against the live database and the live code.

`packages/agents/routing-core/src/ki-handler-spec.ts` carries `bootPrompt: "/handler ki"` with the comment above it: "The `handler` role document, bound to Ki. The `ki` domain document carries the surface she is authorized to reach, and its own description says to load it when running her handler." Its wake source is `status: "LIVE"`. The document it names is `dirty/skills/ki/SKILL.md`, under quarantine.

The same spec's `stateAuthority` reads `"Ki's owned content pages (books/anime/reviews), RLS-owned by her accountUserId"`. That names three categories where the surface is nine page types, and `reviews` matches no page type at all — a `group by page_type_slug` matching `%review%` returns only `review-session`.

The nine exist: `select slug from public.pages where page_type_slug='page-type' and slug like 'ki%'` returns `ki-author`, `ki-book`, `ki-book-series`, `ki-collection-template`, `ki-episode`, `ki-franchise`, `ki-movie`, `ki-season`, `ki-show`. They are enumerated nowhere else — fixed-string `rg` for all eight names over the live `domains/`, `tools/` and `settings/` returns zero, and `account-page-types.ts` declares only five, for media imports rather than authorization.

Nothing enforces the boundary either way. `pages_owner_insert` admits any `page_type_slug` other than `page-type` and `property-definition` where `user_id = auth.uid()`, so writing her data into shared `book` under her own account succeeds and is reported nowhere. Her account already holds 3 rows under shared `book` against 1 under `ki-book`.

Found while ingesting the document itself; its `# Scope` paragraph was kept at `dirty/maybe-keep/skills/ki/SKILL.md` rather than cut, precisely because live code points at it.
