import type { Finding } from "../finding.page-type.ts"

export const theTstlPackageCountedAgainstTemperIsARootFolderReachedByADeadSymlink = {
  id: "01a060c5-305e-7245-a46d-5b608dc430ad",
  pageTypeSlug: "finding",
  slug: "the-tstl-package-counted-against-temper-is-a-root-folder-reached-by-a-dead-symlink",
  domainSlug: "domain/temper",
  claim:
    "`temper/shared-build-deploy-tstl` held no file. It was a tracked symlink to `lua-compiler`, a folder at the root of the repository, and nothing on disk or in any manifest resolved through it. The symlink is deleted with this finding. What it pointed at is a vendored fork of typescript-to-lua at 278 modules, which is a piece of work of its own rather than a temper package to recreate.",
  evidence:
    'The link was mode 120000 in the index, `temper/shared-build-deploy-tstl -> ../lua-compiler`. Every reference to the package is to the name `@temper/shared-build-deploy-tstl` and never to that path: `tools/lib/temper-addon-lua.ts` lines 11 and 74, `lua-compiler/vendor/addons/tsconfig.base.json` lines 19 and 22 naming the two tstl plugins, and seven places inside the compiler naming itself. The root manifest names `lua-compiler` and `lua-compiler/vendor/*` among its workspaces and never names the temper path, so the name resolves to `node_modules/@temper/shared-build-deploy-tstl -> ../lua-compiler` whether the link is there or not. Deleting it and installing again left that same resolution, and `import("@temper/shared-build-deploy-tstl/transpilation/index")` still hands back `transpileProject`.\n\nWhy the compiler is left where it is. 278 TypeScript modules over 797KB, plus a `lualib` of 132 more that are compiled to Lua rather than imported, plus `language-extensions` and a `vendor` workspace. No single file is over the 15,000-byte ceiling, so some earlier hand already split it for akasha, but nothing else about it moved. It is a build tool temper reaches for in the way temper reaches for `typescript`, rather than a part of temper, and it is tracked against an upstream codebase whose changes someone will want to take again.\n\nWhat the folder census should read. Counting `temper/shared-build-deploy-tstl` as one of the folders temper has left outside akasha overstated the count by one, because the folder was never there.',
} as const satisfies Finding
