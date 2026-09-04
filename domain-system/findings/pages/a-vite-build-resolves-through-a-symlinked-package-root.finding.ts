import type { Finding } from "../finding.page-type.ts"

export const aViteBuildResolvesThroughASymlinkedPackageRoot = {
  id: "01a05bb1-0c04-7f9c-9f6f-b9b2efb631c3",
  pageTypeSlug: "finding",
  slug: "a-vite-build-resolves-through-a-symlinked-package-root",
  domainSlug: "domain/akasha-migration",
  claim:
    "Vite, react-router and tailwind all resolve through a symlinked package root, so the native-shell shape is open to Alan's site and not only to an iOS package. What breaks a move of that site is not the symlink but the relative paths that count folders, and those break the same way whether the root is a symlink or a real folder.",
  evidence:
    "Alan's site was copied to `akasha/probe-web-real`, which is two path segments deep as `alanwalton/web` is, so every relative path counting segments held. A build run at that real path exited 0. A symlink `alanwalton/web-probe -> ../akasha/probe-web-real` was then made and `bun run build` run through it, which also exited 0. The two builds emitted the same asset hashes, among them `chess-board-D4pC4G-m.js`, `use-page-Bhvjx6lT.js` and a `build/server/index.js` of 1,348.64 kB. Tailwind emitted 114234 bytes of utilities into `root-BGTgZsV1.css` and `chess-board.css` reached `chess-board-viLTaJkZ.css` at 19013 bytes, so styling survived rather than the build merely exiting 0 without it.\n\nTwo depth failures were met before the control passed, and both are the real cost of the move. React-router's config loader refused with `Failed to load tsconfig '../awen-core'` because `tsconfig.json` references three siblings as `../awen-core`, `../chess` and `../health-samples-access`, which name `alanwalton/` from the old path and nothing from an akasha one. Then rolldown refused `Could not resolve '../../../health-samples-access/src/upsert'` from `app/routes/api.tracking.health-samples.ts`.\n\nFifteen imports in ten files leave the package by relative path rather than by package name. Twelve reach `shared/` five segments up and survive an equal-depth move untouched. Three reach `alanwalton/` siblings and break: two in `app/routes/api.tracking.health-samples.ts` and the tsconfig references beside them. None is in `chess` or `action-verbs`.",
} as const satisfies Finding
