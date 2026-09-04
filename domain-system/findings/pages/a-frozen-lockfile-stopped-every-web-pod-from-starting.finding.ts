import type { Finding } from "../finding.page-type.ts"

export const aFrozenLockfileStoppedEveryWebPodFromStarting = {
  id: "01a05b73-d739-73f7-912f-192235255be1",
  pageTypeSlug: "finding",
  slug: "a-frozen-lockfile-stopped-every-web-pod-from-starting",
  domainSlug: "domain/alan-harness",
  claim:
    "This is repaired; it stands for the episode rather than as work to do. For part of tonight no new pod of Alan's web app could start, on two faults in succession: `bun.lock` disagreed with the manifests, and under that `shared/pages-system` stood in the root workspaces while its `package.json` was never committed. `a603183ec0` and `1b5bca0d2a` repaired them. A frozen install run in this worktree sees neither fault, so it is no deploy gate.",
  evidence:
    'Filed at 23:34 when it was true, and it stayed true longer than it first read. Two faults ran in succession. `bun.lock` disagreed with the manifests, repaired by `a603183ec0`. Beneath it stood a second: `3f584e7885` named `shared/pages-system` in the root `workspaces` list but never committed `shared/pages-system/package.json`, so a tree built from the commit alone stopped at `error: Workspace not found "shared/pages-system"` before ever reaching the frozen check. `1b5bca0d2a`, `the pages-system manifest lands, so the workspace its lock names exists`, repaired that. Both stand on origin/main.\n\nProved the way a pod gets it rather than in the worktree: `git archive HEAD | tar -x` into an empty directory, then `bun install --frozen-lockfile --dry-run`, exits 0 at HEAD `1a780791ec`.\n\nThat distinction is the lesson, and it now stands on its own as a-frozen-lockfile-in-the-worktree-is-no-deploy-gate. The same command run in this worktree answered exit 0 throughout, including while deploys were blocked.\n\nWhile it was broken a `kubectl rollout restart deployment/web` in namespace `alanwalton` left `web-5b8d764cff-h5j7p` at `Init:CrashLoopBackOff` with five restarts while `web-77744999b8-zr6rh` went on serving 2/2. That rollout was undone at once.\n\nWhat outlives the repair: nothing binds `bun.lock` or a workspace manifest to the commit, so this shape recurs unseen, and the init container resets to `origin/main`, so a repair reaches no pod until it is pushed.',
} as const satisfies Finding
