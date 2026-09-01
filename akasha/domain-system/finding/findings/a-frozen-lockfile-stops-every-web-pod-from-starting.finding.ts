import type { Finding } from "../finding.page-type.ts"

export const aFrozenLockfileStopsEveryWebPodFromStarting = {
  id: "01a05b73-d739-73f7-912f-192235255be1",
  pageTypeSlug: "finding",
  slug: "a-frozen-lockfile-stops-every-web-pod-from-starting",
  domainSlug: "domain/alan-harness",
  claim:
    "No new pod of Alan's web app can start. Its init container resets to origin/main and runs `bun install --frozen-lockfile`, and `bun.lock` no longer agrees with the package manifests, so the container fails and backs off forever. The site stays up only because the rollout will not take the running replica down for one that never becomes ready. Every restart, every scale and every deploy of that workload is blocked until `bun.lock` is regenerated and committed.",
  evidence:
    "A `kubectl rollout restart deployment/web` in namespace `alanwalton` left `web-5b8d764cff-h5j7p` at `Init:CrashLoopBackOff` with five restarts while `web-77744999b8-zr6rh` went on serving 2/2. The init container's log ends `init-code: running bun install --frozen-lockfile` then `error: lockfile had changes, but lockfile is frozen`. The same command fails on the working tree, so this is the repository rather than the cluster. The manifests moved tonight and the lockfile did not: `8676ddc876` the readout system's manifest naming the credential and the relay, `c0be28265a` the scale reading, `9eff73051c` a package naming the packages its code reaches, and `e5c11674b7` pointing badge importers at `@akasha/design-badges`. The rollout was undone, so only the original pod stands and nothing is churning. Note that the init container resets to `origin/main`, which is far behind the working tree, so committing `bun.lock` is not enough on its own; see a-deploy-pushes-what-head-carries-onto-origin-main.",
} as const satisfies Finding
