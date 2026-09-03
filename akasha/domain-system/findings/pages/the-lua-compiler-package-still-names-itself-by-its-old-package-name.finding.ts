import type { Finding } from "../finding.page-type.ts"

export const theLuaCompilerPackageStillNamesItselfByItsOldPackageName = {
  id: "01a06805-e2b9-74d4-bf3d-84c5da961cbb",
  pageTypeSlug: "finding",
  slug: "the-lua-compiler-package-still-names-itself-by-its-old-package-name",
  domainSlug: "workspace-package/lua-compiler",
  claim:
    "The compiler package moved to `akasha/language-design/lua-compiler` and is reached as `@akasha/lua-compiler`, but six strings inside it still say `@temper/shared-build-deploy-tstl`: the CLI name, two Node version messages, the help text for `--luaPlugins`, the `source` set on diagnostics, and the comparison that filters diagnostics by that source. Nothing is broken today, because the setter and the comparison agree with each other.",
  evidence:
    "The six sites: `tstl-cli-information/…code.ts:3` (`export const name`), `tstl-cli/…code.ts:245` and `:252` (version messages), `tstl-cli-parse/…code.ts:90` (option description), `tstl-utils/…code.ts:42` (`source:` set on a diagnostic), `tstl-cli-report/…code.ts:4` (`diagnostic.source === ...`). The last two are the reason this is worth recording rather than fixing casually: they are a matched setter and reader, so changing either one alone silently stops the diagnostic filter matching, and a diagnostic filter that matches nothing looks exactly like a build with no diagnostics. They have to change together. The other four are text a person reads and can change independently. The old name is no longer reachable as a package: the workspace entry is gone from the root manifest and from `bun.lock`, and `node_modules/@temper/shared-build-deploy-tstl` is not recreated by `bun install`.",
} as const satisfies Finding
