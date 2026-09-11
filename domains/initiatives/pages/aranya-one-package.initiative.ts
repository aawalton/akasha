import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const aranyaOnePackage = {
  id: "01a0876f-87da-77c3-9e65-8d261c7cbf2d",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "aranya-one-package",
  domain: "domain/akasha",
  persona: "aranya",
  parent: "initiative/akasha-folder-shape",
  intents: [
    {
      statement: "A cluster service deploys naming no package but the root.",
      workingMemory:
        "Nothing in a deploy names a package by hand any more. `buildScript` runs the builder from `/app/repo/node_modules/.bin/react-router`, proved by deploying archive-of-worlds-web at 777bd37a; all seven spell the same `react-router build`, and the binary hoists to the root. What is left is derived: `dockerfileFor` hands `listWorkspaceDirs` to the generators, which COPY each member manifest, and `collectExecutedDeps` maps package names to dirs. Both empty once no folder but the root is a package.",
    },
    {
      statement: "A native app deploys naming no package but the root.",
      workingMemory:
        "The mac build does `cd <nativeShellDir>`, `bun install`, `bun run ios:add` in `foundation.module.code.ts`, so each of the three ios-app folders is installed on its own — which `Package Only When Needed` names as exactly when a folder needs to be a package. Nothing reaches them by name: they are `@alanwalton/*-native-shell`, their dependencies are Capacitor plugins and their scripts are `cap` calls. So this intent waits on the mac build installing at the root instead.",
    },
    {
      statement:
        "One change dissolves a workspace package and repoints every path that reached it.",
      workingMemory:
        "The TypeScript parse is not what makes `move-folder` slow. Over 500 real files `placedIn` costs 0.31ms each, `spelledIn` 0.15ms and `changeImports` whole 0.21ms, so temper 22206 files parse in about 5 seconds, far inside the 120-second ceiling. The 96ms a file recorded before was the whole act, so the cost sits in what the act does around the parse per file. `remove-package-manifest` and `remove-package-alias` are already acts.",
    },
    {
      statement: "No folder but the root is a workspace package.",
      workingMemory:
        "Each fold is `change-file` off `manifest` then `remove-package-manifest`, and `change-page-page-type` to `domain` only where the page was a bare workspace-package. 12 manifests are left beside the root, each read by a tool that walks up to it: 7 web apps by react-router, 3 ios-apps by Capacitor, 2 editor extensions by vscode. The deploy intents above no longer wait on this one; this one now comes first, since what is left of them empties when these manifests go.",
    },
    {
      statement: "A check refuses a relative path.",
      workingMemory:
        "The check judges at no phase, which its own invariant holds until the tree is clean. That is a deadlock: thirteen composers rewrite folded files back, so the count cannot reach zero while they run, and the gate that would stop them waits on zero. Mending every composer is the way out. runsOnChange judges what a change carries rather than the tree, so it need not wait on a clean tree. `akasha audit --check no-relative-specifier` is the meter, and a subagent cannot run it.",
    },
    {
      statement: "No file names another file by a relative path.",
      workingMemory:
        "66 refusals over 124566 files, from 85324 at the start. Every hand-written specifier is folded, so all 66 are composer output. Thirteen composers write an import line as text with a relative specifier, not the three recorded here before; five are mended. A patch re-composes a page body, so patchPage un-folded 17 of 4384 pages 45 minutes after the fold. Subagent pages are mortal, so their count is a population rather than a backlog. The check leaves `./+types/` alone, as tsconfig rootDirs needs.",
    },
  ],
} as const satisfies Initiative
