import type { Finding } from "../finding.page-type.ts"

export const anIsolatedCheckoutStillPushesToTheSharedRemote = {
  id: "01a060be-c946-7003-b783-d6cf1127590b",
  pageTypeSlug: "finding",
  slug: "an-isolated-checkout-still-pushes-to-the-shared-remote",
  domainSlug: "domain/change",
  claim:
    "A checkout copied with `cp -a` to test a change in isolation inherits `origin`, and the gated write commands hand off a detached push without being asked. A test move landed on the shared `refs/heads/main`. Isolating the working tree does not isolate the remote, and nothing in the copy says so before the first landing.",
  evidence:
    "Measured 2026-09-02. I copied the checkout to a scratch path to test a repair to `sidecarsOf`, ran a real `mv` of a made-up page there to prove the round trip, and read `push: handed off to origin — this write is durable at its commit` in the output. `git ls-remote origin refs/heads/main` then answered my test commit. `pushBranch` in repo/git/git.ts:367 runs `git push <remote> HEAD:refs/heads/<branch>`, handed off detached by repo/push/push-repo.ts, and my copy's base was newer than what origin held, so it went as a fast-forward with nothing to refuse it.\n\nNothing was lost: everything origin held is in the shared checkout, and my two test commits are the only things on origin that are not. But main now names a commit the shared checkout does not carry, so every other lane's push is refused as behind until someone puts it back.\n\nI could not put it back. `block-destructive-git` refuses `git push --force`, correctly, and no non-forcing sequence restores a branch that has been moved onto a side chain. It needs `git push --force origin HEAD:refs/heads/main` from the shared checkout, whose HEAD carries `f3bf5e3d08` and 51 later commits and none of mine.\n\nThe call taken: I removed `origin` from the copy the moment I saw it, so nothing further escaped, and I am reporting rather than reaching for the guard's exception. What would stop the next one is a copied checkout dropping its remote, or the push handoff refusing a root that is not the resolved akasha checkout — the same question `AKASHA_ROOT` already answers for reads.",
} as const satisfies Finding
