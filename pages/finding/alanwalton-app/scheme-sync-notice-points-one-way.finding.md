---
id: 6ab054b0-8ec8-51b1-b714-4f483fc851b7
page-type-slug: finding
title: "Scheme sync notice points one way"
domain-slug: domain/alanwalton-app
---

# Claim

The `alanwalton://` scheme literal is held twice, and the notice saying so points only at the copy that already carries it. `apply-ios-seam.sh` warns that changing one without the other silently breaks the handoff; `link-target.ts`, in the workspace CI builds every branch, names neither the script nor the `Info.plist` registration it has to agree with. Changing that literal alone does fail a wired test, on a URL-parsing expectation naming no plist, which reads as a stale assertion to update.

# Evidence

Read from `/var/home/walton/code` on 2026-08-08; every file named is tracked.

`apply-ios-seam.sh:185-190` sets `URL_SCHEME="alanwalton"` under "HAND-SYNCED with APP_URL_SCHEME in packages/alanwalton/web/app/questions/lib/link-target.ts … Changing one without the other silently breaks the handoff." Line 275 writes that value into `CFBundleURLTypes:0:CFBundleURLSchemes:0`, so it is what the installed app registers.

`link-target.ts:21` sets `const APP_URL_SCHEME = "alanwalton"` and line 57 builds the outbound URL from it. `rg -n 'apply-ios-seam|native-shell|hand-sync|HAND-SYNC'` over that file exits 1.

Nothing compares the pair. `rg -n 'APP_URL_SCHEME'` over the repo returns three tracked lines: the shell comment, the constant, its one use. The same pattern over `packages/infra/checks/src/lib/check-configs-capacitor.ts` returns nothing, and of the 232 mechanisms `ops enforcement list` reports, none reads either literal.

The asymmetry runs against the traffic. `native-shell` is absent from the root `package.json` `workspaces` array and its own `description` reads "NOT a monorepo workspace; built standalone on the macbook via Xcode", so the script is run by hand through `ios:add` / `ios:sync` — while `link-target.ts` sits in the `packages/alanwalton/web` workspace CI typechecks and tests on every branch.

The one guard on the TypeScript side misdirects. `link-target.unit.test.ts:99` asserts `expect(parsed.protocol).toBe("alanwalton:")` and `check-unit-tests` is wired, so changing the constant alone does fail CI — with a literal mismatch inside a test about URL parsing. Nothing in that failure names `Info.plist`, `CFBundleURLTypes` or the script.
