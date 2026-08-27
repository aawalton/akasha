---
id: a0146149-58ee-5ff4-93bb-7fe0f816c2e4
page-type-slug: finding
title: "UI router agnosticism false"
domain-slug: domain/pages-system
---

# Claim

`router-context.tsx` asserts that `@shared/pages-ui` "imports nothing from `react-router/*` (or any other host router)", and three non-test source files in the package import from `react-router` — two of them runtime hooks, not types — while the manifest declares `react-router` as a peer dependency.

# Evidence

`packages/shared/pages/ui/src/router-context.tsx:6-7` states the invariant: "`@shared/pages-ui` is framework-host-agnostic at the package boundary — it imports nothing from `react-router/*` (or any other host router)." The paragraph at :16-20 says the seam was kept after the Next.js → RR v7 migration "because the framework-agnostic Provider shape continues to carry its weight (the shared package stays decoupled from any single host router)".

`rg -n 'from "react-router"' packages/shared/pages/ui/src/` returns eight files. Five are `*.component.test.tsx` using `createRoutesStub`, which the invariant plainly allows. Three are not tests:

- `src/media/playing-session-context.tsx:11` — `import { useFetcher, useLocation, useNavigate } from "react-router"`
- `src/media/page-media-player.tsx:3` — `import { useLocation, useSearchParams } from "react-router"`
- `src/media/use-audio-auto-advance.ts:2` — `import type { Location, NavigateFunction, useFetcher } from "react-router"`

The first two are value imports of runtime hooks, so the package calls the host router directly rather than reading a primitive from a context it defines. The third is type-only.

`packages/shared/pages/ui/package.json:32` declares `"react-router": ">=7"` inside the `peerDependencies` block that opens at :17 and closes before `"dependencies"` at :35. So the coupling is declared in the manifest as well as written in the source.

The seam itself is intact for what it covers: `router-context.tsx` defines the contexts, and :67 throws a named error — "Missing `<PagesUIRouterProvider>`" — when the provider is absent. The nine nav-consuming components its comment enumerates were not re-checked one by one; what is measured here is the package-boundary quantifier, which the media subtree breaks.

Not measured: when the three imports landed, or whether the media subtree was meant to be exempt. `git log` was not consulted, so whether this is drift or an unrecorded carve-out is unknown.

Read at `ecf5f9518f` on `main`, 2026-08-07.
