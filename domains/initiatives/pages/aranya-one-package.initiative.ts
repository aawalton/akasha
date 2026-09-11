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
      statement: "No file names another file by a relative path.",
      workingMemory:
        "22 refusals over 124568 files, from 85324 at the start, and all 22 are subagent pages, which are mortal and drain as they are reaped. Every hand-written specifier is folded and all thirteen composers are mended, so nothing writes a relative specifier any more. A subagent page written after the mend is root-spelled, seen across two seats. The check runs at change now and refuses one there, proved by a deliberate violation that was refused and dropped.",
    },
    {
      statement: "A cluster service deploys naming no package but the root.",
      workingMemory:
        "Measured by writing both bun-service Dockerfiles: the only lines naming a package are the `COPY <dir>/package.json` ones for ops-extension, vscode-typings and the three ios-apps, emitted from listWorkspaceDirs so bun install --frozen-lockfile finds every member. Every other line is a path: collectExecutedDeps resolves akasha/ by path since 3207c923332 and emits a folder copy each, so it never empties. The four tool-images take no dirs and already name only the root.\n",
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
        "No tool walks up: react-router and Capacitor both take process.cwd(), measured in node_modules. So the 7 web apps need no tool change; 5 go now, and alan/web pairs with web-capacitor once 21 specifiers come off its exports map. The 3 ios-apps wait on the mac build installing at the root. 2 can never go: ops-extension is vscode own descriptor, and vscode-typings is named workspace:* by the root. A removal leaving a dangling workspace:* fails the deploy frozen-lockfile gate.",
    },
    {
      statement: "A check refuses a relative path.",
      workingMemory:
        "The check runs at change and refuses a relative specifier there, proved by a deliberate violation that was refused and dropped. runsOnWorktree, runsOnDeploy and runsOnAudit are still false: each reads the whole tree, which holds 22 refusals, all subagent pages draining as they are reaped. The page type calls for running at change before the count reaches zero, which this check own invariant had contradicted; that invariant is restated.",
    },
  ],
} as const satisfies Initiative
