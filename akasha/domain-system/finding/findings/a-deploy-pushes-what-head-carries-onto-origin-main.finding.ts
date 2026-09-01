import type { Finding } from "../finding.page-type.ts"

export const aDeployPushesWhatHeadCarriesOntoOriginMain = {
  id: "01a05b4b-2136-7cb9-8fa0-ba1587e30378",
  pageTypeSlug: "finding",
  slug: "a-deploy-pushes-what-head-carries-onto-origin-main",
  domainSlug: "module/web-app-building",
  claim:
    "A pod builds only what origin carries, so a deploy of a sha origin lacks must push it or refuse. The call taken was to push: `akasha deploy` fast-forwards origin's main to HEAD before the pod fetches. That publishes every commit on main, so putting up one web app puts every other agent's committed work onto origin too. Refusing was weighed and dropped: the pod resets to origin/main on every start, so a build from a sha origin lacks is walked back by the pod's own restart.",
  evidence:
    "The init container runs `git fetch origin --prune` then `git reset --hard origin/main` on every pod start, at `infra/k8s-types/src/orchestrator-cache.ts:53-54`; nothing there builds. So a build made from a local-only sha stands beside a checkout that has moved away from it, and the next restart serves the older tree. The push is `git push origin <sha>:refs/heads/main` with no force, at `web-app-building.module.code.ts` `pushToOrigin`; a non-fast-forward is rejected by the server and the deploy stops before `buildInPod`, saying origin would not take the sha. Measured tonight: HEAD ran 42 commits ahead of origin at one point and 7 at another, with about 1486 commits landing in a night across some ten agents, so the window where HEAD is unpushed is common rather than rare. Three real runs show the path: `source 43c09646f9 origin does not carry it yet` then `pushed 43c09646f9 onto origin main` then `built audhdalan/web`; a second run at the same sha reported `source ... origin carries it` and pushed nothing.",
} as const satisfies Finding
