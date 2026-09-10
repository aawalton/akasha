import type { Initiative } from "../initiative.page-type.types.ts"

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
      statement: "The root manifest names every file reached from outside the folder with it.",
      workingMemory:
        'The root manifest now states `exports: {"./*": "./*"}`, naming every file by wildcard rather than by enumeration, so that intent is part met in the form that gives up the boundary. The 277 non-root manifests are what make every `@akasha/…` name resolve, and 261 enumerate their ways in by hand with no wildcard among them. `tsconfig.base.json` declares no `paths`, so a manifest taken away takes its share of 21055 import sites dark.',
    },
    {
      statement: "A workstation service deploys naming no package but the root.",
    },
    {
      statement: "A cluster service deploys naming no package but the root.",
      workingMemory:
        "`dockerfile-bun-service` copies `bun.lock`, `tsconfig.base.json`, the root manifest and every member manifest, runs one `bun install --production --frozen-lockfile`, then copies each `depDirs` folder and `${appDir}`. `appDir` is the `folder` the built-image page states, not anything a manifest says. `depDirs` is `collectExecutedDeps`, which reads only `@akasha/` specifiers, and every service now spells its reaches `akasha/...`, so an image carries its own folder alone.\n",
    },
    {
      statement: "A native app deploys naming no package but the root.",
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
        "Each fold is `change-file` off `manifest`, `change-page-page-type` to `domain`, `remove-package-manifest`. Folded: pages, rules-engine, supabase-auth, utils, indexes, code-system, pages-ui, calendar-sync, auth-proxy, backup-retention. A fold lengthens every specifier into it, so a file near the byte ceiling crosses it and refuses that landing; split it first. 62 manifests are left: 48 eso-addon, 5 router-app, 3 ios-app, 2 config, cluster-manifests, vscode-typings and ops-extension.\n",
    },
    {
      statement: "One change replaces every relative path in a folder with an absolute path.",
    },
    {
      statement: "A check refuses a relative path.",
    },
    {
      statement: "No file names another file by a relative path.",
      workingMemory:
        "temper alone holds 29775 import specifiers: 10895 bare names, 16857 relative paths landing inside temper, and 2023 landing outside it. The outward ones are nearly all page-type imports, 1628 of them reaching `code-system/modules/module.page-type.ts`, which the rest of the tree already spells `@akasha/code/module`.",
    },
  ],
} as const satisfies Initiative
