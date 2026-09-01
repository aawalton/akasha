import type { Finding } from "../finding.page-type.ts"

export const typecheckRepoCompilesOneProgramNoBuildMakes = {
  id: "01a05ce0-2436-7000-bb53-b68211a33944",
  pageTypeSlug: "finding",
  slug: "typecheck-repo-compiles-one-program-no-build-makes",
  domainSlug: "workspace-package/checks",
  claim:
    "typecheck-repo compiles all 15554 TypeScript files as one program under ten hand-written compiler options, so its 2647 errors describe a compilation this repository never performs, while the authoritative referenced build over the same tree is clean.",
  evidence:
    "`writeTsconfig` at `tools/lib/typecheck-run.ts:99-122` synthesizes the whole config in the temp box and `runTsc` at `:133-139` points `-p` at that file rather than the repository's. What it omits is what matters: no `jsx`, no `paths`, no `baseUrl`, no `lib`, no `target`, no `moduleResolution`, no `references`. `tsconfig.base.json`, which every real project extends, states all of them. `excludesFor` at `:77-97` reads only the `exclude` key from a per-project tsconfig and throws the rest away. Three error classes follow and none can exist in the real build. Missing `paths` gives 303 TS2307, among them `alanwalton/atlas-web/app/routes/api.locations.ingest.ts(3,37)` failing on `~/lib/location-batch`. Missing `jsx` gives 48 TS6142 — 1.8 percent of the total, not the bulk. Merging 123 separate projects into one program collides globals that are isolated in reality: TS2451 on `LibAlchemyStation`, TS2300 on `TemperInventory`, TS2403 on `TemperHud`. The root `tsconfig.json` states `files: []` and 38 references; walking them reaches 123 tsconfigs of the 201 on disk, so 79 projects are compiled that the build never touches. `temper/shared-addon-libraries-lib-sets` is one of them and alone accounts for 1049 of the 2647. Measured this hour: `bunx @typescript/native-preview -b tsconfig.json --force` exits 0 with no diagnostic, its tsbuildinfo files rewritten during the run. Errors by directory: temper 2255, alanwalton 210, shared 58, lua-compiler 41, akasha 5, collections 1.",
} as const satisfies Finding
