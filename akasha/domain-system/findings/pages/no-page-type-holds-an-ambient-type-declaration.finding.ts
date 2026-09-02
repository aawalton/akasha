import type { Finding } from "../finding.page-type.ts"

export const noPageTypeHoldsAnAmbientTypeDeclaration = {
  id: "01a06039-93e1-7b78-9194-ec40c8d41086",
  pageTypeSlug: "finding",
  slug: "no-page-type-holds-an-ambient-type-declaration",
  domainSlug: "domain/temper",
  claim:
    "Temper carries 257 `.d.ts` files that akasha's naming grammar cannot name. `partedIn` reads `enums.d.ts` as slug `enums`, section `d`, held `ts`, and `d` is no file-property slug, so the file is refused. Nothing under `akasha/` is a `.d.ts` today. Every ESO addon leans on these: they are the only description of the game's 20,000 globals, and the TypeScript in 63 addon packages will not typecheck without them.",
  evidence:
    '`git ls-files temper` answers 257 paths ending `.d.ts`. The four largest are temper/addons/types/eso/generated/enums.d.ts at 246,745 bytes, functions.d.ts at 131,887, objects.d.ts at 15,020 and temper/shared-addon-libraries-lib-sets/src/types/lib-sets-searchui-objects.d.ts at 14,041. The grammar is akasha/pages-system/page/page-file-name/page-file-name.module.code.ts: `held` is /^[a-z0-9]+$/ and a section is admitted only where it names a file property. Tallying `git ls-files akasha` by extension answers ts 10,396, jsonl 2,774, tsx 171, json 96, sh 52, md 40, swift 37, yaml 9, css 7, entitlements 3, gitignore 2, plist 2, svg 1, html 1 — and no `.d.ts`. The module page type declares `code` as `"ts" | "tsx"` (akasha/code-system/module/properties/code.file-property.ts), so a declaration file is not a module\'s code either. Two mends are open and neither is mine to choose: a `declarations` file property whose held is `ts` would give the name `<slug>.<page-type>.declarations.ts` and lose the `.d.` TypeScript itself keys ambient-ness on, while a named-file-property fixes one name and 257 files carry 257 names.',
} as const satisfies Finding
