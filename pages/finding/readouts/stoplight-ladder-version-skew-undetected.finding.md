---
id: 1b476065-a8d9-54bb-98a7-2665bb79baae
page-type-slug: finding
title: "Stoplight ladder version skew undetected"
domain-slug: domain/global
---

# Claim

The two stoplight surfaces can run different versions of one ladder indefinitely, and the estate's own divergence detector cannot see it. The VSCode extension bundles `@shared/status-bar-access` into `out/extension.js` while the widget path runs it live on the pod, so between a threshold landing on main and Alan reloading his window the two render different ladders. `served-artifact-divergence-core` catches this shape; its population is web apps baking a build sha, and the extension bakes none.

# Evidence

Found on 2026-08-07 while emptying `dirty/skills/alan-harness/findings.md`, which recorded the skew on 2026-07-28. That document is queued for removal, so the observation is filed here to outlive it. Every reading was re-taken.

`packages/agents/vscode-extension/package.json:28` is the whole build: `bun build --target=node --format=cjs --outfile=out/extension.js --external=vscode src/extension.ts`. It is a static bundle, and the ladder is inside it (`rg -c 'getInboxStoplightTiers|resolveValueStoplightTiers' out/extension.js` returns 4). `package.json:14` points `main` at that file, so what VSCode loads is the bundle rather than the workspace source.

The other surface takes it live: `packages/alanwalton/web/app/routes/api.inbox-stoplights.ts` imports `getInboxStoplightTiers` from `@shared/status-bar-access` and runs it per request on the pod.

The same route's docblock, at line 21, is where the overclaim sits: "the same ladders the vscode status bar renders as circle glyphs, so the two surfaces never drift." True of the decider — there is one implementation and no second copy of any threshold. Not true of what the two surfaces render, which is what a reader takes from the sentence.

WHAT MAKES THIS MORE THAN A STALE BUNDLE. The estate already built the instrument for this failure. `packages/agents/devops-monitor/src/wedges/served-artifact-divergence-core.ts` extracts baked 40-hex build shas from served assets and reports divergence; its stated population is "each user-facing web app [that] bakes its build sha into the served client bundle (`NEXT_PUBLIC_BUILD_SHA`)". The extension is not a web app, bakes no sha, and serves no asset, so it falls outside that population silently — the detector reports clean over a set that never included it.

Not measured: how far the installed bundle lags main. `out/extension.js` was last written 2026-08-07 11:50, which says when it was built, never which source from. Whether any threshold has changed since.
