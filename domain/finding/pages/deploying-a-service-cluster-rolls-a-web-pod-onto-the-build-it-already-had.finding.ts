import type { Finding } from "akasha/domain/finding/finding.page-type.types.ts"

export const deployingAServiceClusterRollsAWebPodOntoTheBuildItAlreadyHad = {
  id: "01a0c593-64ee-7054-9e97-d45e31e45eda",
  type: "page-type/finding",
  slug: "deploying-a-service-cluster-rolls-a-web-pod-onto-the-build-it-already-had",
  domain: "page-type/web-app",
  claim:
    "Deploying a web app's service cluster rolls its pod onto a fresh checkout and the build the old pod had, so the site serves code from an earlier commit while reporting the new one as checked out.",
  evidence:
    "A router app has three slugs, and only the web-app slug builds. `putUpWebApp` is the one path that calls `buildInPod`, and it is reached by the web-app slug. The service-cluster slug applies manifests and waits on `kubectl rollout status`, and its report carries no build line at all.\n\nThe new pod does not build either. `webBuildInitContainer` opens by answering `a build is beside the server already` and exiting where `build/server/index.js` is there, and it never reads `build/.built-from` to see which commit that build is of. The build sits on a cache volume the pods share, so a rolled pod finds the old one and starts on it.\n\nMeasured 2026-09-21 on `alanwalton/requests`. `akasha deploy alanwalton-requests` reported `recorded alanwalton-requests 3e42ee89934d5e45a3330291989b8df1a3d80385` and rolled pod `requests-7489d6979-9vfc9`. In that pod `git rev-parse HEAD` answered `3e42ee89934d5e45a3330291989b8df1a3d80385`, `cat build/.built-from` answered `4f349501d7173d2bbc42e89ef7928e029db2bf7d`, and `/api/live-version` answered `4f349501d7173d2bbc42e89ef7928e029db2bf7d`. The change landed in that deploy was not in the served HTML.\n\n`akasha deploy alanwalton-requests-web` is what carries code. Nothing in the service-cluster deploy's report says the build it left running is older than the checkout it made.",
} as const satisfies Finding
