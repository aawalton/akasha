---
id: 2c5d4847-e388-5628-b115-6119e24c4a3f
page-type-slug: finding
title: "Code reaches have two spellings and one is unchecked"
domain-slug: domain/agent-harness
---

# Claim

The instrument that checks code-repository reaches matches only one of the two spellings now in use, so 181 runtime reaches stand unverified.

# Evidence

`tools/checks/code-paths-resolve.ts` matches `/"(packages\/[A-Za-z0-9._@\/-]+\.ts)"/g` and refuses a named path standing nowhere in the code repository.

Its own comment states the premise: anchored on `packages/` and a `.ts` ending, "which is what every reference into that repository" looks like.

That premise is no longer true. Measured over `tools/lib` and `tools/commands` on 2026-08-13:

- 486 distinct path-form constants, e.g. `"packages/shared/supabase/server/src/index.ts"` — matched and checked.
- 181 distinct specifier-form constants, e.g. `"@shared/supabase-server"`, `"@agents/routing-core"`, `"@agents/oauth-proxy/state-file"` — not matched, not checked.

Both forms are passed to `codeModule`, which resolves a specifier through `Bun.resolveSync(ref, codeRoot())` and a path against the code root. Both reach the same module and Bun keys its registry on the resolved path, so there is no duplicate instance at runtime. The difference is only in what the instrument can see.

So a specifier that stops resolving — a package renamed, an export map narrowed, a subpath removed — lands as a runtime failure in one verb rather than a refusal at the gate, which is the failure class this check exists to convert.

The two spellings also reach one module under two names. `tools/lib/persona-code.ts` names `@shared/supabase-server` while `tools/lib/persona-pages.ts` names `packages/shared/supabase/server/src/index.ts`. Neither is stale. A reader grepping for either finds half the reaches.

This is a consequence of the ops migration rather than a pre-existing state: both spellings arrived with moved bodies, seats choosing per file with nothing declaring which form is meant.

Not repaired. Widening the pattern is not the whole decision — which spelling a reach should use is unsettled, and `domains/global.md` Ubiquitous Naming argues for one name rather than a checker that tolerates two.
