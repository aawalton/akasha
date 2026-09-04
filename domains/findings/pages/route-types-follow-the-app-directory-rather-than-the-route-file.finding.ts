import type { Finding } from "../finding.page-type.ts"

export const routeTypesFollowTheAppDirectoryRatherThanTheRouteFile = {
  id: "01a05cdc-7ea1-72eb-92b7-67e65a2e543f",
  pageTypeSlug: "finding",
  domainSlug: "router-app/alan-web",
  slug: "route-types-follow-the-app-directory-rather-than-the-route-file",
  claim:
    "react-router typegen exits 1 on a routes.ts string naming a file that is not there, inside the app directory or outside it, so existence is verified either way. What it will not do outside is generate the route's `+types`: the module lands in the generated route map as `unknown` and typegen still exits 0. Landing Alan's 62 route files as modules under akasha/alanwalton-web would untype loaderData on every one of them.",
  evidence:
    'Probed on alanwalton/web against react-router 7.15.1. Renaming one routes.ts string to a file that is not there exits typegen 1 with ENOENT naming the missing path, both for `routes/api.health.GONE.ts` inside the app directory and for `../elsewhere/api-health.ts` outside it. Adding route("probe", "../probe-pkg/route-probe/route-probe.module.code.tsx") over a file that is there exits 0 and adds no file at all under .react-router/types: the route still reaches .react-router/types/+routes.ts:271 carrying its id and its page "/probe", while its module entry at line 495 reads `unknown`, where every in-app route at lines 485-500 reads `typeof import("./app/routes/<name>.tsx")`. That module type is what GetAnnotations reads loaderData off, and its absence is what took app/routes/page-detail.tsx down: no exported loader made loaderData the literal `undefined` and the route threw for every signed-in visitor until e0e6fdee7f. Off `unknown` the same reads type as any and raise nothing. 47 of the 62 route files import ./+types/<name>, resolved by `rootDirs` at alanwalton/web/tsconfig.json:15-18, and the other 15 hold no tie to the generated tree at all. Setting appDirectory to a symlink of app/ regenerates the whole tree under .react-router/types/probe-app/routes/+types/ with `type Module = typeof import("../page-detail.js")` unchanged, so these types follow the app directory rather than the folder a route file is spelled into.',
} as const satisfies Finding
