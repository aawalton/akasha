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
        "`akasha deploy` does run the generator: `appliedWorkload` calls `publishedFor`, which writes the Dockerfile to a cache dir and builds it with buildctl, so no Dockerfile on disk is expected. Both generators now take their COPY set from `collectExecutedDeps`. No built image is of the nextjs kind, so that one is composed for nobody yet. The seven web apps build in a live pod: `buildScript` runs `bun install` at the root and `bun run build` in the app folder, which is what keeps their manifests.\n",
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
        "Each fold is `change-file` off `manifest` then `remove-package-manifest`, and `change-page-page-type` to `domain` only where the page was a bare workspace-package. 12 manifests are left beside the root and every one is read by a tool that walks up to it: 7 web apps by react-router, 3 ios-apps by Capacitor, and the two editor extensions by vscode. Folding one takes that tool changing, so this intent now waits on the deploy intents above it.\n",
    },
    {
      statement: "A check refuses a relative path.",
      workingMemory:
        "The check is built: page, decision, check and audit, each with its test. It judges at no phase yet, which is what its own invariant calls for until nothing names a file by a relative path. `akasha audit --check no-relative-specifier` is the meter and needs no phase. Meeting this intent is setting runsOnChange, runsOnWorktree, runsOnDeploy and runsOnAudit true on the page, and that waits on the tree being clean.",
    },
    {
      statement: "No file names another file by a relative path.",
      workingMemory:
        "`rename-folder-imports` at a folder does the work, one folder to a landing. 85324 refusals at the start, 79349 after utils, design, domains, places, personas, the ten smallest folders and both type generators. Three things block a folder and none of them is the act: a file going over the 15000 byte ceiling because a root-spelled specifier is longer than a relative one, a test asserting the exact spelling of a path, and a page path spelled rather than asked of the index.",
    },
  ],
} as const satisfies Initiative
