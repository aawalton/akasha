import type { Finding } from "../finding.page-type.ts"

export const aCaptureHostReExportReachedNoCaller = {
  id: "01a0607e-a955-7368-8a9c-6eabae7274aa",
  pageTypeSlug: "finding",
  slug: "a-capture-host-re-export-reached-no-caller",
  domainSlug: "domain/temper",
  claim:
    "`@temper/shared-capture-host/capture-root-schema` re-exported `readFirstAccountWide` and `savedVariablesRootSchema` from `@akasha/temper-saved-variables/account-wide`, and no file in the tree imported that way in. The two packages wanting those names already reached the akasha module directly. The akasha recreation carries one module rather than two. A caller needing those names imports them from `@akasha/temper-saved-variables/account-wide`.",
  evidence:
    "A grep across every tracked file for `capture-root-schema` and `captureRootSchema` returned five hits outside the package itself, and every one of them was the direct import rather than the re-export:\n\n- `temper/shared-capture-datamining-reader/src/saved-variables-schema.ts:3` imports `savedVariablesRootSchema as captureRootSchema` from `@akasha/temper-saved-variables/account-wide`\n- `temper/shared-capture-errors-decision-core/src/saved-variables-schema.ts:3` does the same\n\nBoth then call it at their line 99 and line 36 respectively. Neither names `@temper/shared-capture-host/capture-root-schema`.\n\nThe remaining hits were the package's own `package.json` export map, its own source file, and its build output under `dist/`.\n\nThe twelve consumers of `@temper/shared-capture-host` all imported exactly one way in, `assert-schema-matches-payload`. The `capture-root-schema` way in was declared and reached by nothing.\n\nThe source package was deleted in the same work that filed this, so the re-export exists nowhere now.",
} as const satisfies Finding
