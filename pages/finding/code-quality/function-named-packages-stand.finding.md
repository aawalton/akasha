---
id: caa0b13a-b711-5c2c-805c-1a2ac8dc6066
slug: function-named-packages-stand
page-type-slug: finding
title: "Function named packages stand"
domain-slug: domain/code-quality
---

# Claim

`domains/code-quality.md` Domain Directory says new code goes in a directory named for its subject, never one named for what it does. Three package trees already break it: `@shared/utils` publishes seven packages each named for a function, `@infra/scripts` holds 34 entries under one name spanning at least seven unrelated subjects, and `@infra/lib` is named for no subject at all. The rule landed with these standing, as debt rather than as a claim the tree already keeps.

# Evidence

Measured 2026-08-09 on `~/code` at main, while landing Domain Directory from `dirty/maybe-keep/code/claude-composed.md`.

`packages/shared/utils` holds 105 TypeScript files across seven published packages: `@shared/utils-fs`, `-mcp`, `-narrow`, `-process`, `-sync`, `-system`, `-test`. Every one is named for what its code does, so the bucket is functional and so are its sub-buckets — the axis is spent on function twice over.

`packages/infra/scripts` holds 67 TypeScript files, 34 entries directly under `src`, published as `@infra/scripts`. The subjects are unrelated: ESO wallpaper download and crop, dockerfile generation across eight modules, Playwright storage-state export and self-heal, CI throughput measurement, Claude usage, shell word lexing and prose-flag parsing, stale-folder cleanup, tunnel config, workspace bin verification. Nothing but the form `is a script` groups them.

`packages/infra/lib` holds no TypeScript at all — seven `*.dockerfile-extensions.json` files, `deploy-functions.sh`, and a `package.json` publishing `@infra/lib`. It is named for neither a subject nor a function, only for being a place.

Not established: what any of these should become. Splitting `@infra/scripts` by subject, or dissolving `@shared/utils` into the domains that use it, are refactors nobody has scoped, and `@infra/lib` may be a build-asset holder that wants a different name rather than a different home.
