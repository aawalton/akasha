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
      statement: "A native app deploys naming no package but the root.",
      workingMemory:
        "`akasha deploy <app> --simulator` builds on the mac and reports BUILD_SIM_OK, so the build is proved from here with no phone and no signing; alanwalton is green on it. The checkout path is already rooted, since `--device` makes a whole worktree. The simulator path is the blocker: it rsyncs the shell folder and the shared files alone into ~/.akasha-ios-build and runs `npm install` there, so the app manifest is the install root. Write the manifest at that tree's root instead, off `tool-reached`.",
    },
    {
      statement: "No folder but the root is a workspace package.",
      workingMemory:
        "Three manifests are left, all ios-apps, waiting on the mac build installing at the root. ops-extension and vscode-typings are both gone: the editor link points at the repository root and reads the root manifest as vscode.akasha, and the ambient editor api is reached by the extension's own tsconfig rather than by a package name, which typechecks clean over the whole extension. linked-at moved to domain, so the root page states where the editor reaches it.\n",
    },
    {
      statement: "No file names another file by a relative path.",
      workingMemory:
        "22 refusals over 124568 files, from 85324 at the start, and all 22 are subagent pages, which are mortal and drain as they are reaped. Every hand-written specifier is folded and all thirteen composers are mended, so nothing writes a relative specifier any more. A subagent page written after the mend is root-spelled, seen across two seats. The check runs at change now and refuses one there, proved by a deliberate violation that was refused and dropped.",
    },
    {
      statement: "A check refuses a relative path.",
      workingMemory:
        "The check runs at change and refuses a relative specifier there, proved by a deliberate violation that was refused and dropped. runsOnWorktree, runsOnDeploy and runsOnAudit are still false: each reads the whole tree, which holds 22 refusals, all subagent pages draining as they are reaped. The page type calls for running at change before the count reaches zero, which this check own invariant had contradicted; that invariant is restated.",
    },
  ],
} as const satisfies Initiative
