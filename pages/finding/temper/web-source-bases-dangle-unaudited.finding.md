---
id: cb78366e-8f6b-56b8-bca9-efa14eecb6b9
slug: web-source-bases-dangle-unaudited
page-type-slug: finding
title: "Web source bases dangle unaudited"
domain-slug: domain/temper
---

# Claim

Five of the twelve `@source` bases in `packages/temper/web/app/globals.css` name directories that do not exist, and no instrument audits them: `check-tailwind-sources` selects apps by `/^packages\/[^/]+\/next$/`, which matches nothing in the tree, so every `globals.css` under `web/` is outside its reach. A dead `@source` base drops the classes it would have contributed from the built bundle without erroring.

# Evidence

Measured in `~/code` at `383bf60d35c15cd5d10cd07f39ac33ffb38e2bfa`.

Resolving each `@source` base against the file's own directory, the five absent ones are `../../equipment/src`, `../../equipment/ui/src`, `../../completion/ui/src`, `../../inventory/ui/src` and `../../skills/morphs/ui/src`. The other seven — the six `shared/design/*` packages and `shared/pages/ui/src` — resolve.

The whole set of `globals.css` files was walked, not just this one. `git ls-files` returns seven: `alanwalton/atlas/web/app`, `alanwalton/web/app`, `alanwalton/web/app-capacitor`, `archive-of-worlds/web/app`, `audhdalan/web/app`, `smilingjenny/web/app` and `temper/web/app`. Every base in the other six resolves, so the drift is confined to `@temper/web`.

Nothing audits them. `APP_WS_RE = /^packages\/[^/]+\/next$/` at `tailwind-sources-violations.ts:83` is tested against a workspace's repo-relative path in `enumerateTailwindApps`, and `git ls-files` matches no path under `packages/*/next/` at all, so the apps list is empty and the `invalid-path` arm never runs. Running `bun packages/infra/checks/src/checks/check-tailwind-sources.ts` exits 0 with "No @source coverage violations found. [over 380 of 380 workspace packages]".

That population line is the denominator of workspace packages walked, not of apps found. `enumerateTailwindCandidates`'s docblock states the choice deliberately: "the migration off Next.js left zero apps and the rule still walks every package to establish that." So the empty app set is the state the code says it is in, and the five dead bases sit outside the rule rather than passing it.
