---
id: 50385346-5921-5b07-9410-546de2f604f8
page-type-slug: finding
title: "Barrel checks never dispatched"
domain-slug: domain/global
---

# Claim

Two files that are named checks, shaped as checks and routed as ops verbs are dispatched by no pipeline step, so what they guard crosses green whoever edits it.

# Evidence

`check-producer-barrel.ts` and `check-enricher-barrel.ts` sit under `packages/infra/checks/src/checks/`, carry the `#!/usr/bin/env bun` shebang every executable check carries, are routed as verbs at `packages/shared/cli/src/ops/registry.ts` lines 121 and 127, and are named at `verdict-coverage.config.json` lines 232 and 233. No `*.workflow.ts` and no `lib/check-configs*.ts` names either, and neither appears in `lib/scanner-registry.ts`, so nothing in a crossing dispatches them. `check-enricher-barrel.ts`'s own header opens by answering "Why a check, not a build step".

What they guard is `packages/infra/checks/src/enrichers.generated.ts`, whose first line reads "AUTO-GENERATED — do not edit by hand. Regenerate with: bun ops check-enricher-barrel --fix". A hand edit to that file is refused by nothing on the way to main.

Method: 188 registry entries taken from `name: "…"` across `lib/check-configs*.ts`; 160 executable checks taken from the `check-*.ts` files carrying a shebang, excluding `.test.ts` and `.cli.ts`. 28 names sit in the second set and not the first. 24 of those resolve into `check-syntax-bundle.ts` through `lib/scanner-registry.ts`, which imports them by entry and documents the standalone runners as kept for local debugging. `build-graph` runs as `preparation-build-graph` and `foundation-synth-watch` as `k8s-foundation-synth-watch`. These two resolve to nothing.
