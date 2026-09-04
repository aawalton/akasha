import type { Finding } from "../finding.page-type.ts"

export const aRouteLeavingTheAppDirectoryLeavesTheServerLeakGateBehind = {
  id: "01a05cdc-7ea2-7e79-a5b3-897c0ba52e9a",
  pageTypeSlug: "finding",
  domainSlug: "router-app/alan-web",
  slug: "a-route-leaving-the-app-directory-leaves-the-server-leak-gate-behind",
  claim:
    "A route's server-only half is kept from the browser by its `.server` name and by check-rr-server-module-in-client, which reads only what stands under an app directory. An akasha module code file has no room for a `.server` suffix, and no akasha package declares `sideEffects: false`. Route files landing under akasha/alanwalton-web leave that gate reading clean over code it never opened.",
  evidence:
    'infra/cluster-checks/src/checks/check-rr-server-module-in-client.ts:50-59 resolves each app\'s appDir, builds its route-module set from `${appDir}/routes.ts`, then reads every `**/*.ts` and `**/*.tsx` under that appDir alone. A file moved to akasha/alanwalton-web stands under no appDir, so that reading never reaches it. Its own remediation line at :17 tells a writer to move a server-only reach into a route module\'s loader or action, which is the shape the move would take away. Searching alanwalton/web/app for `*.server.*` answers 27 files, among them app/routes/page-detail-loader.server.ts, the loader answering /:pageTypeSlug/:pageHrefParam. Reading every package.json outside node_modules for "sideEffects" answers one file, akasha/design/design-system/package.json; akasha/alanwalton-web/package.json does not carry it, so a loader reached as `@akasha/alanwalton-web/...` is not shaken out of the client bundle once react-router drops the route\'s own loader export. The same move decides what replaces the fix at e0e6fdee7f. no-re-export.code-check.code.ts:80 returns no refusal for a path that does not open with `akasha/`, so `export { loader } from "./page-detail-loader.server"` is legal where it stands and refused once the file moves in. That code reads only export declarations and export assignments, and the check page holds that an imported value bound to a fresh exported name is a declaration this file made, so `import { loader as x }` with `export const loader = x` lands.',
} as const satisfies Finding
