import type { Finding } from "../finding.page-type.ts"

export const theRestoreOfPageLeftItOutOfTheRootBuild = {
  id: "01a06860-a4b6-7034-8dd5-80bd372ca851",
  pageTypeSlug: "finding",
  slug: "the-restore-of-page-left-it-out-of-the-root-build",
  domainSlug: "domain/akasha-migration",
  claim:
    "The untypechecked window under the root `page/` directory closed by the directory ceasing to exist, as it was ruled it would. `page/` is gone, the root `tsconfig.json` carries six references and none of them is `./page`, and what the directory held is inside akasha as `@akasha/markdown-pages`, so `page-types`, `file-tree` and `frontmatter` are carried rather than absent. What outlives the case is the note on the guard: `block-typecheck` states a warrant narrower than the rule it enforces, which is how a guard gets worked around by the next reader who reads the reason rather than the predicate.",
  evidence:
    'The root `tsconfig.json` carries `"files": []` and six references: `./akasha/temper/temper-web`, `./akasha/smilingjenny/smilingjenny-web`, `./akasha/archive-of-worlds/archive-of-worlds-web`, `./akasha/audhdalan/audhdalan-web`, `./readouts` and `./tools`. There is no `./page` entry and no `page/tsconfig.json`, because there is no `page/`.\n\nWHAT WAS HELD TO BE ABSENT BY DESIGN IS NOT. `page-types.ts`, `file-tree.ts` and `frontmatter.ts` stand inside akasha as `markdown-page-types`, `markdown-file-tree` and `markdown-frontmatter`, exported as `@akasha/markdown-pages/page-types`, `/file-tree` and `/frontmatter`. The refusal that reading rested on, in `akasha/pages-system/pages-access/file-write-backing/file-write-backing.module.code.ts`, declines to keep a roster of repo and glob per page type and says nothing about parsing, file trees or the registry.\n\nTHE NOTE ON THE GUARD, WHICH WILL BE MET AGAIN. `block-typecheck` states its warrant as the root `tsconfig.json` carrying `"files": []`, so that `tsc --noEmit` there compiles nothing and exits 0 over a canary. That warrant holds for the root and did not hold for every tsconfig the guard refuses over -- `page/tsconfig.json` carried real `include` globs while it stood. The guard is broader than the reason it gives. Read the predicate rather than the refusal text before concluding a guard does not apply.',
} as const satisfies Finding
