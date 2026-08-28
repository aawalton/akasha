---
id: cb78366e-8f6b-56b8-bca9-efa14eecb6b9
slug: web-source-bases-dangle-unaudited
page-type-slug: finding
title: "Web source bases dangle unaudited"
domain-slug: domain/design-system
---

# Claim

No instrument catches a Tailwind `@source` base naming a directory that does not exist. A dead base contributes no files to the scan, so every utility class used only in the package it named is dropped from the built bundle, and nothing errors. Unaudited, the bases rotted in all seven web apps at once, when a rename flattened the package tree and no stylesheet followed it.

# Evidence

Measured in akasha at `aaca8d023ca5870723daa145e1e7d2e301a0596a`, and repointed at `a2cb525f9f303c8c11a468b9d98cc1a6249ee28e`.

Seven `globals.css` files carry 55 path `@source` bases between them. Resolving each against its own file's directory, 51 named a directory that did not exist — every base reaching outside its own app. The four that resolved are the app-local ones: `./idle` and `./awen` in `alanwalton/web/app`, `../app` and `./` in `alanwalton/web/app-capacitor`.

The rename was a flattening. `shared/design/system` is `shared/design-system`, `shared/pages/ui` is `shared/pages-ui`, `temper/player/completion/ui` is `temper/player-completion-ui`. Every target existed under its flattened name, so each dead base had a live counterpart the whole time it was dead. The move that broke them is `0e6982101`, "Move every package in the code repository into akasha". `alanwalton/atlas-web/app/globals.css` carried a second fault under the first: `../../../../shared` from `alanwalton/atlas-web/app` leaves the repository, so its bases would have stayed dead on a rename fix alone.

Compiled both ways with the pipeline the app itself uses — `@tailwindcss/vite` 4.3.3, driven from `alanwalton/web/vite.config.ts:8` — the loss is not cosmetic. Against the dead bases the scan reached 448 files and none at all under `shared/`; against the live ones, 1,088 files, 640 of them under `shared/`. The emitted stylesheet goes from 42,239 bytes to 136,836, and the app was emitting 229 of the 1,049 class rules its own components ask for. Of the candidate classes, 5,859 appear only in the corrected build and none only in the old one.

`size-3.5` at `shared/design-primitives/src/components/checkbox.tsx:27` is one dropped class of many. `Checkbox` is imported by `alanwalton/web/app/sms/opt-in-form.tsx:2`, the class appears nowhere under `alanwalton/web`, and the rule for it exists only in the corrected build, so the check icon shipped with no width and no height. `Button` lost its whole interaction layer the same way: `after:absolute`, `after:inset-0` and `hover:after:opacity-[var(--state-hover)]` from `shared/design-primitives/src/components/button.tsx:12` and `:31`.

Nothing else covered the gap. `globals.css` puts no `source(...)` on its `@import "tailwindcss"`, so Tailwind's auto-detected root is the Vite root, `alanwalton/web`, which never reaches `shared/`; Oxide skips `node_modules`, so the symlinked workspace packages are not found that way either; and `@shared/design-system/styles.css` carries no `@source` of its own. Only the scan was broken — that `@import` names a package rather than a path and resolved throughout, so the design system's own declarations were never missing.

An arm reporting exactly this already exists. `infra/cluster-checks/src/lib/tailwind-sources-violations.ts:114` raises an `invalid-path` violation for any directive whose `resolvedBase` is null, and `pages/cluster-check/cluster-check-tailwind-sources.cluster-check.md` dispatches that check on `css-file` nodes. Whether it never ran, never reached these files, or ran and went unacted on is not established here: it takes a `--tree-sha` and was not run for this reading.
