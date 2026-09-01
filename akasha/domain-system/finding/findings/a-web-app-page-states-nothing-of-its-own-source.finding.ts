import type { Finding } from "../finding.page-type.ts"

export const aWebAppPageStatesNothingOfItsOwnSource = {
  id: "01a05b08-26f6-7001-911f-52e84f0b0f49",
  pageTypeSlug: "finding",
  slug: "a-web-app-page-states-nothing-of-its-own-source",
  domainSlug: "workspace-package/service-system",
  claim:
    "A web app's page states which cluster services run it and nothing else about it. Where its source stands, what builds it, what image runs it, what port it answers on and what hostname reaches it are all stated somewhere other than a page. A deploy can be driven from the pages as far as the workload and the code that emits its manifests, and no further.",
  evidence:
    "A whole `*.web-app.md` page carries id, page-type-slug, title, slug, `repo: akasha`, a domain parent, `cluster-service-slugs`, required reading and a definition sentence. The three property definitions it has stand at `pages/page-property-definition/web-app-cluster-service-slugs`, `web-app-live-version` and `web-app-deployed-at`. The cluster service page beside the app's code adds `kind`, `namespace` and `resource-name`, which together name one workload. Everything else lives in the code attachment: `alanwalton/web/alanwalton-web.cluster-service.code.attachment.ts:70` names the image, `:41` the replica count, `:74` the container port, `:72` the working directory. The source directory is recovered by `deploy-system/build/build.ts:45-71`, which parses the emitted manifest for a container whose `workingDir` opens with the repository path and slices the prefix off. The build command is a string literal at `build.ts:257`. The hostnames are in a per-app `tunnel-routes.ts` that no page names and `infra/k8s/src/cloudflared` reads. There is no `web-app` page type under `akasha/` at all, only `pages/page-type/web-app.page-type.md`, which declares no properties. The call taken tonight was to let `akasha deploy` read the workload from the pages and make no build, so nothing had to be guessed; `module/web-app-reading` carries a gap invariant saying a web app's page states where its own source stands.",
} as const satisfies Finding
