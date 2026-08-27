---
id: 57615a43-f4e2-5387-8047-e22177ba329e
slug: web-typecheck-needs-unlisted-env-vars
page-type-slug: finding
title: "The web typecheck needs three env vars the example file does not list"
domain-slug: domain/global
---

# Claim

Typechecking `packages/temper/web` on the workstation fails before it compiles anything, because `react-router typegen` reaches `supabaseClientEnvDefine`, which throws on three environment variables that `.env.local.example` does not list and no `.env.local` supplies.

# Evidence

Found by the developer on #19319 on 2026-08-17 while repairing branch CI, and verified here against `/var/home/walton/worktrees/19315` at `f87d03e43a`. The three are `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `NEXT_PUBLIC_ELECTRIC_URL`. All three are absent from `.env.local.example`, a 19-line file, and no `.env.local` stands in the worktree or in `~/code`. Setting placeholder values for the three is what let the typecheck reach exit 0.

This is a local-shell gap rather than a hole in coverage. The `check` workflow's own typecheck step passed in pipeline 28197 over 139 of 139 steps, so CI supplies the three by some route the workstation does not share; if it did not, that step would have failed the same way rather than compiling nothing silently. The route CI uses was not traced here.

The values are inlined into the client bundle by vite `define` and reach no type, so placeholders satisfy the typecheck without standing for anything real. What the example file should say for each is the part nobody has judged.
