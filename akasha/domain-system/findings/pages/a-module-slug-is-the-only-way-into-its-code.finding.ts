import type { Finding } from "../finding.page-type.ts"

export const aModuleSlugIsTheOnlyWayIntoItsCode = {
  id: "01a0607c-474e-7189-a859-47e13764e206",
  pageTypeSlug: "finding",
  slug: "a-module-slug-is-the-only-way-into-its-code",
  domainSlug: "workspace-package/temper-catalog-core",
  claim:
    "A workspace package holds that a way in naming a module's code is spelled as that module's slug, so recreating a package renames every import subpath its consumers spell, not just the package half. Four of catalog-core's nine ways in changed name. A seat planning a recreation should count the subpath renames as part of the repointing rather than expecting the package half alone to move, which is what the twelve capture-shapes packages had led seats to expect.",
  evidence:
    '`temper/catalog-core/package.json` named nine subpaths after its source file names plus a wildcard `"./*": "./src/*.ts"`. In akasha the module slugs are `catalog-payload`, `catalog-descriptor`, `domain-keys`, `domain-registry`, `saved-variables-accessor`, `apply-invalidations`, `clear-target`, `batch-config` and `catalog-walk`, so `/types`, `/descriptor`, `/registry` and `/walk` all changed at 25 call sites. The wildcard way in is not recreated, since the manifest names every way in and a module the manifest does not name is reached only from inside the package. A second rename came from the naming rule on module constants: `catalogCaptureDescriptor` was refused as not upper snake and is now `CATALOG_CAPTURE_DESCRIPTOR`, which `temper/catalog-addon/src/main.ts` imports by name. Two module-private constants were renamed the same way, `registry` to `REGISTRY` and `_assertKeysMatchPayload` to `ASSERT_KEYS_MATCH_PAYLOAD`. Every recreated body is otherwise byte for byte the original, the only other change being that the formatter sorted the nineteen import lines of `catalog-payload`.',
} as const satisfies Finding
