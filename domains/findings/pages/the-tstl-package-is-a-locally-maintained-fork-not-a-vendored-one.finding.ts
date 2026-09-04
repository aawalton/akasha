import type { Finding } from "../finding.page-type.ts"

export const theTstlPackageIsALocallyMaintainedForkNotAVendoredOne = {
  id: "01a06798-4d53-7004-b27c-434f9652728f",
  pageTypeSlug: "finding",
  slug: "the-tstl-package-is-a-locally-maintained-fork-not-a-vendored-one",
  domainSlug: "workspace-package/lua-compiler",
  claim:
    "Supersedes `the-tstl-package-counted-against-temper-is-a-root-folder-reached-by-a-dead-symlink`, which is done: it calls the tstl package a vendored fork of typescript-to-lua. It is not — it is a locally maintained fork, 48 commits deep, carrying local structural rules and ESO game-specific code no upstream copy would carry, and it now lives at `akasha/language-design/lua-compiler` rather than at the root-folder path that old finding examined.",
  evidence:
    '`git log --oneline -- lua-compiler | wc -l` gives 48 local commits, not a vendored history. `LuaAST` and `LuaPrinter` were each split for file-length rules: `tstl-lua-ast-core`, `tstl-lua-ast-expressions`, `tstl-lua-ast-statements` under `akasha/language-design/lua-compiler/`, and `tstl-lua-printer-core`, `tstl-lua-printer-expressions`, `tstl-lua-printer-statements`, `tstl-lua-printer-helpers` beside them. Two plugins exist only here: `tstl-plugin-tstl-no-truthy-numbers/`, `tstl-plugin-tstl-no-multi-store/`. `lualib/src/` carries game code built on ESO globals: `zo_callLater` and `EVENT_MANAGER` in `Scheduling.ts`, `GetGameTimeMilliseconds` in both `Performance.ts` and `Date.ts`. It now lives at `akasha/language-design/lua-compiler`, linked at `node_modules/@akasha/lua-compiler -> ../../akasha/language-design/lua-compiler`.\n\nThe symlink the old finding tracked, `node_modules/@temper/shared-build-deploy-tstl`, was removed and recreated untracked; re-measured now, it resolves to `-> ../lua-compiler`, mtime 07:05, and that target is gone — the root `lua-compiler/` folder the old finding examined has since been deleted, so the link is dead. Root `package.json` no longer names `lua-compiler` in `workspaces` at all, yet the link still exists: `bun.lock` line 4222 still carries `"@temper/shared-build-deploy-tstl": ["@temper/shared-build-deploy-tstl@workspace:lua-compiler"]`, orphaned now that the workspace entry is gone from the manifest, and is the likeliest hand recreating it on install.',
} as const satisfies Finding
