import type { Finding } from "../finding.page-type.ts"

export const theAddonBuilderCannotExpandTheAkashaWorkspacesGlob = {
  id: "01a060ae-70e1-78d9-b2ac-5b138f213804",
  pageTypeSlug: "finding",
  slug: "the-addon-builder-cannot-expand-the-akasha-workspaces-glob",
  domainSlug: "domain/temper",
  claim:
    "`ops temper addon build` fails for every addon before it compiles anything, because the root package.json names `akasha/**` among its workspaces and the builder's directory lister expands only a trailing `/*`. No addon in this repository has been compiled to Lua since that entry landed, so no seat of this wave can prove the Lua bundle its repointing produces.",
  evidence:
    '`bun run ops temper addon build TemperHud --build-only` exits 70 with `listWorkspaceDirs: unsupported workspaces glob "akasha/**" — only trailing "/*" segments are expanded today`. The entry is at package.json line 6 and is present in HEAD, so the breakage predates this wave\'s repointing. Running the compiler directly is no way around it: `bun lua-compiler/src/cli/tstl.ts -p tsconfig.json` in temper/shared-interface-hud-addon exits 2 with TS5096, allowImportingTsExtensions wanting noEmit or emitDeclarationOnly, and the same command in temper/catalog-addon, which this seat did not touch, exits 2 with the identical refusal. tsconfig.base.json line 10 sets allowImportingTsExtensions and temper/addons/tsconfig.base.json line 9 sets noEmit false, and the ops command works around this by handing the compiler flags no tsconfig names. So typecheck under --noEmit is the only proof available to a seat today, and it does not exercise the Lua emit.',
} as const satisfies Finding
