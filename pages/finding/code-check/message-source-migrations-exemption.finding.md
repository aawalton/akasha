---
id: cf31c44c-e35a-51c8-bb92-83b3b4b36a1c
page-type-slug: finding
title: "Message source migrations exemption"
domain-slug: domain/global
---

# Claim

`check-no-hardcoded-message-source` exempts every path containing `/migrations/`, and no statement of why that is safe survives in the estate. The exemption holds 144 TypeScript files out, 138 of them the `packages/shared/supabase/migrations` package's own tooling rather than any migration. The SQL surface it reads as protecting was never in the cohort, so narrowing it would not reach a `messages.source` predicate landing in a `.sql` migration.

# Evidence

Read 2026-08-07 against `~/code` at `383bf60d35`.

`check-no-hardcoded-message-source.ts:75`, inside `isExcluded`: `if (rel.includes("/migrations/")) return true`, wired in as `preFileSkip`. The header states the invariant — no hardcoded `messages.source` value outside `wake-source-tags.ts` — and says a new exemption is "a visible edit to this list". The list carries no reason for this entry.

Five directories match: `infra/scripts/migrations` (3 ts), `shared/database/migrations` (1 sql), `shared/supabase/database/migrations` (1 sql), `shared/supabase/migrations` (138 ts, 6 sql) and `temper/game/crafting/addon/src/migrations` (3 ts). The largest is not migrations at all — it is the migration runner package, exempted because its directory is named `migrations`.

The check reaches TypeScript only: `listTsFiles` builds the cohort and `typescript` parses each member. A `.sql` file is never a member, so a partial index over `source` in a hand-written SQL migration is outside this gate whatever the exemption says.

The hole is latent. Grepping all five directories for `"source"`, `'source'` and `messages.source` across ts/tsx/sql returns nothing.

`schema/public/tables/messages.sql:34` is `CREATE INDEX messages_source_created_at_idx ON public.messages USING btree (source, created_at)` — non-partial, no literal, and nothing in CI holds it that way.

The ground went with `docs/message-source-boundary.md`, removed from the instructions repo at `b7e9d7d9d`; its quarantined rebuild is gone too.

Not measured: I read `isExcluded` and the cohort builder rather than running the check, and took no view on which repair is right. Only a check over the committed table snapshot would reach the SQL surface.

`pages/finding/agent-fleet/ungated-system-source-literal.finding.md` records a different gap in the same gate.
