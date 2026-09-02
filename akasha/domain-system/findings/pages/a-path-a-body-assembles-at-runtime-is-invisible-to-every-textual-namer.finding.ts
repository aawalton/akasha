import type { Finding } from "../finding.page-type.ts"

export const aPathABodyAssemblesAtRuntimeIsInvisibleToEveryTextualNamer = {
  id: "01a06285-94dc-71f1-b8f2-3dc54b8a9601",
  pageTypeSlug: "finding",
  slug: "a-path-a-body-assembles-at-runtime-is-invisible-to-every-textual-namer",
  domainSlug: "module/remove-naming",
  claim:
    "A namer that searches tracked bodies for a path finds only the bodies that spell it. A body assembling the path from pieces reaches the folder and is not found, so a removal reported as named by nothing can break a check. The break falls inside a path part rather than at a separator, so no prefix or suffix of the path recovers it and no widening of the search will. What answers such a reach is running the consumers, not searching harder. Two temper folders cannot be taken away for exactly this.",
  evidence:
    "`akasha/command-system/command/remove/remove-naming` searches the tracked bodies of the base commit for each path given and for the last part of each, with `git grep -l -I -z -F`. `tools/lib/check-workflow/lccc-vendor-sites.ts:4` holds `ADDON_LIBRARIES_PREFIX = \"temper/shared-addon-libraries-\"`; line 6 builds `${ADDON_LIBRARIES_PREFIX}lib-character-knowledge/src/lccc` and line 27 globs `${ADDON_LIBRARIES_PREFIX}*/src/lccc/*.ts`. Searching the tree outside `akasha/` for `shared-addon-libraries-lib-character-knowledge` answers four files: `bun.lock`, `package.json`, `pages/package/temper-shared-addon-libraries-lib-character-knowledge.package.md`, and that folder's own `package.json`. The check is not among them. The literal in the source ends at `libraries-` and the rest begins at `lib-`, inside one path part, so a search for any leading or trailing run of the path misses it too. The generated `lccc-vendor-sites.d.ts` does spell the whole path out, and `git ls-files` does not hold it, so it is outside what the namer reads; were it tracked, the namer would report a build artifact and still not the source. `git ls-files -- 'temper/shared-addon-libraries-*/src/lccc/*.ts'` answers two folders, `lib-character-knowledge` and `lib-extended-journal`. The check refuses where it finds fewer than two vendored copies, so taking either folder away breaks it, and the namer reports that nothing names either.",
} as const satisfies Finding
