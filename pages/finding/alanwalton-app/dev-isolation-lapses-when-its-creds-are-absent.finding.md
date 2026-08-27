---
id: bcaa3601-9366-5674-b5c2-c3bf7c7c4eda
page-type-slug: finding
title: "Dev isolation lapses when its creds are absent"
domain-slug: domain/alanwalton-app
---

# Claim

The idle save layer's four fail-closed dev-isolation layers all hang on the throwaway credentials being PRESENT. A worktree dev-server with `IDLE_TEST_USER_EMAIL` or `IDLE_TEST_USER_PASSWORD` unset falls through to the real session cookie, with no environment check on that path, so a logged-in dev build reads and writes Alan's one canonical save — the outcome the four layers exist to prevent — and none fires. What stands between a dev build and his real row is an untracked `.env.local` line.

# Evidence

Read in `~/code` on 2026-08-08, emptying the idle package's quarantined CLAUDE.md.

`app/idle/lib/idle-save-context.server.ts` is where dev and prod identity diverge. `devTestUserCreds()` returns `null` twice over: `if (readEnv("NODE_ENV") === "production") return null`, then `if (email == null || password == null) return null`. `resolveIdleSaveContext` then reads

    const creds = devTestUserCreds()
    if (creds != null) { ...throwaway identity... }
    const bearer = await resolveBearerContext(request)
    if (bearer != null) return bearer
    const { user, headers } = await getUser(request)

Nothing after the first branch tests `NODE_ENV` again. Absent creds and production are the same `null`, so a non-production build without creds takes the production path.

Each of the four guards then misses. (a) and (c) are `assertNotProtectedSaveUser(data.user.id)`, which sits inside `getDevTestUserContext` — a function this path never enters. (b) the RLS `WITH CHECK` at `schema/public/tables/idle_saves.sql:40` and `:54` is `user_id = (auth.uid())::text`, satisfied because the caller genuinely IS that user. (d) `idle-saves.server.ts:65` is `if (opts?.isDevTestWrite === true) assertNotProtectedSaveUser(userId)`, and `api.save.ts` passes `isDevTestWrite: ctx.devTestUser === true`, which this context never sets.

The write lands on the canonical row through the ordinary owner path, which every layer is built to permit.

Not hypothetical for this row. The package document being emptied records the same outcome reached the other way — the seam once pointed at `BROWSER_TEST_*`, Alan's own account, and names the resulting `999.9` junk found pre-migration. Guard (a) closed that route. This one it did not close, and it needs no misconfiguration to reach: it is what a fresh worktree does by default.

`.env.local` is untracked, so nothing in CI or the repository observes whether the creds are set. The durable repair is a refusal: fail the non-production branch closed when the throwaway identity is missing, rather than fall through to the real session.
