---
id: 26a836bd-9e71-5dea-bf2c-451601d50f9e
page-type-slug: finding
title: "Dependency policy cited by title resolves to nothing"
domain-slug: repo/code-repo
---

# Claim

Two files in `packages/alanwalton/mobile-cli` justify NOT taking a dependency by deferring to a "Dependency Policy", and no document of that name is reachable from either repository. Each citation is the stated reason a hand-rolled client stands where a published one would do, so an editor weighing whether to add `webdriverio`, `appium` or `@supabase/supabase-js` is sent to an authority they cannot open — and the policy's own rebuilt heir was ingested and removed, leaving nothing live that carries it.

# Evidence

Measured over `~/code` at HEAD `1313565199` on branch `main`, working tree clean, 2026-08-07.

`rg -in 'dependency-policy|Dependency Policy'` over the whole code tree, excluding `node_modules`, returns exactly two hits. Both are bare titles; neither carries a path.

`packages/alanwalton/mobile-cli/src/lib/appium-client.ts:10`, in the docblock of a "Dependency-free W3C WebDriver / Appium REST client": "(Dependency Policy: no `webdriverio`/`appium` client dependency for a surface this small)".

`packages/alanwalton/mobile-cli/src/lib/sim-auth.ts:28`, in a docblock headed "Dependency-free": "no `@supabase/supabase-js` client needed for a surface this small (Dependency Policy)".

Both are load-bearing in the same direction: each is the whole stated reason a hand-rolled `fetch` client stands where a published client would otherwise be taken. The named packages are real and available, so the citation is what stops the obvious change.

Nothing resolves the title. In `~/instructions`, `rg -i 'dependency.policy'` over `domains/` returns nothing. `dirty/docs/dependency-policy.md` was deleted from quarantine at `e54f2f257`, an 84-line deletion with no addition in the same commit, whose subject reads "the dependency policy leaves quarantine, its declaration-reading half rebuilt and its in-image half named as unlanded". The heir that rebuild produced, `dirty/knowledge/postinstall-binary-block.md`, was itself ingested and removed at `087820a3e`, and `dirty/knowledge/` is now empty. `rg -in 'postinstall-binary-block'` over the code tree returns nothing, so the heir was never cited from there either.

The nearest live trace is one check name, `- check-postinstall` at `domains/lists/unresolved-checks.md:133`, which says nothing about which dependencies may be taken.

Not measured: whether the two exceptions were correct when written, and what the policy should now say.
