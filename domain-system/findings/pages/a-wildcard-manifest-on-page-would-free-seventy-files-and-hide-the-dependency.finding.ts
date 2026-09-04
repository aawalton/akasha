import type { Finding } from "../finding.page-type.ts"

export const aWildcardManifestOnPageWouldFreeSeventyFilesAndHideTheDependency = {
  id: "01a06742-4483-7a0b-a19e-898050b16097",
  pageTypeSlug: "finding",
  slug: "a-wildcard-manifest-on-page-would-free-seventy-files-and-hide-the-dependency",
  domainSlug: "domain/akasha-migration",
  claim:
    "Giving the repo-root `page/` a manifest naming wildcard exports would make all 70 `tools/` files it blocks movable at once, with no repoint, no new module and nothing deleted. The route is real and was declined: it would carry akasha's dependency on a tree marked for removal across the line while hiding it from the check that exists to see it.",
  evidence:
    'Measured 2026-09-03 at commit 38d49725 by two lanes that reached the mechanism independently.\n\nThe mechanism is recorded separately as `the-import-gate-resolves-a-package-specifier-by-exact-export-key-only`: `reachesIn` files exports keys literally, so `"./*"` produces the one unmatched entry `@pkg/*`, and `landingOf` ends in `naming.get(specifier) ?? null`, so every real specifier into such a package answers null and `imports-inside` admits it.\n\nSo a `page/package.json` naming `@page` with `"exports": { "./*": "./*.ts" }`, plus `"page"` in the root workspaces, would make all 70 reaches answer null. `page/` itself would not be touched. This is the same route `@tools/lib` and `@tools/ops` already ride, and it is the single largest lever measured on the `tools/` migration: of 1,315 files, 1,200 are already movable and 70 of the remaining 115 are blocked by `page/` alone.\n\nWhy it was declined rather than taken. `page/` was deleted once and the deletion broke the live harness — the supervisor, the verb server, the message MCP, the model gateway, the statusline and the `aw/cli.ts` every interactive shell evals — and it was restored at `a4b95979b0`. It is meant to go. Taking this route would move 70 importers of that tree inside akasha while making the gate blind to the fact, so the migration would read as done and the dependency would survive unmeasured.\n\nWhat is not settled: whether the route survives `manifest-names-what-is-reached` and `package-reached-where-named`. Only `imports-inside` was probed. This is filed for Alan to rule on rather than taken.',
} as const satisfies Finding
