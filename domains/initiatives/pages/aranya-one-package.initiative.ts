import type { Initiative } from "../initiative.page-type.ts"

export const aranyaOnePackage = {
  id: "01a0876f-87da-77c3-9e65-8d261c7cbf2d",
  pageTypeSlug: "initiative",
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
        "`dockerfile-bun-service.module.code.ts` copies the root manifest, `bun.lock` and every member manifest, runs one `bun install --production --frozen-lockfile`, then copies the whole `node_modules`. `collectExecutedDeps` picks which source folders to copy by walking the package dependency graph, so it is the one tool that reads these manifests; the import index already answers what it asks.",
    },
    {
      statement: "A native app deploys naming no package but the root.",
    },
    {
      statement:
        "One change dissolves a workspace package and repoints every path that reached it.",
      workingMemory:
        "`remove-package-manifest` and `remove-package-alias` are already acts. `move-folder` sets the cost to beat: it hands every moved body to the TypeScript parser to collect string literals, measured at 96ms a file over 103 files and 108ms over 481, so temper's 22206 files run past the 120-second ceiling `command-stopping` allows.",
    },
    {
      statement: "No folder but the root is a workspace package.",
      workingMemory:
        "279 manifests, 96 of them under temper. None is installed separately from the root: the generated service Dockerfiles reproduce the root install inside the image, the one hand-written Containerfile that installs is `COPY . .` then `bun install --frozen-lockfile`, and the five inference Containerfiles use only apt and pip.",
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
