import type { Finding } from "../finding.page-type.ts"

export const alanWebsMissingRouteTypesBlockEveryChangeToAPackageItDependsOn = {
  id: "01a0657d-a75e-700b-8031-344cd5916b09",
  pageTypeSlug: "finding",
  slug: "alan-webs-missing-route-types-block-every-change-to-a-package-it-depends-on",
  domainSlug: "domain/akasha-migration",
  claim:
    "`akasha/alan/web` moved in without the route types its own routes import, so the akasha folder does not compile. The typecheck is scoped to the dependents of what a landing touches, which means the breakage is invisible to a landing elsewhere and total for a landing under any package `alan/web` depends on. `@akasha/person-system` is one of those, and no manifest change to it can land while this holds.",
  evidence:
    "Measured 2026-09-03. A write adding `akasha/person-system/person-handlers/` was refused with fifteen errors, none of them in the files it wrote. Thirteen read `Cannot find module './+types/<route>' or its corresponding type declarations` across `akasha/alan/web/routes/` and `akasha/smilingjenny/smilingjenny-web/routes/api.push.register.ts`. Two more are in `akasha/alan/web/alan-auth-provider/alan-auth-provider.module.code.tsx`: TS2345 at line 156 and TS18048 at line 157.\n\nThe generated types are on disk at `akasha/alan/web/.react-router/types/routes/+types/`, so what is missing is the mapping that lets a route reach them, not the typegen output. `akasha/alan/web/tsconfig.json` does not exist, and react-router resolves `./+types/x` through a `rootDirs` entry in the package's own compiler settings.\n\n`git log` names `336e3d6a0b Alan's web app modules move into akasha` as the commit that carried the routes in.\n\nA landing carrying a `package.json` for `@akasha/persona-system` passed 36 checks minutes earlier, so this is not a repository-wide failure. It is the dependent set of `alan/web` alone. Anything a worker owns under `person-system` is blocked on it, and the worker sees only somebody else's file names in the refusal.",
} as const satisfies Finding
