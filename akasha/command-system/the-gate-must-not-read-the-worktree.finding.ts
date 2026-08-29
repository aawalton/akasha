import type { Finding } from "../domain-system/finding/finding.page-type.ts"

export const theGateMustNotReadTheWorktree = {
  id: "01a04bdd-596d-70de-9a5d-dc54eb56b2c9",
  pageTypeSlug: "finding",
  slug: "the-gate-must-not-read-the-worktree",
  domainSlug: "domain/checks-system",
  claim: "The gate that judges every write today builds a hermetic tree and then reads every unchanged file from the live working tree, so the checks judge a state nobody proposed.",
  evidence:
    "The tree's paths come from a temporary index built from the change, but its reader falls through to reading the caller's working copy for any path the change does not touch. Seven checks run on patch and judge the whole tree, so each of them sees proposed bodies grafted onto whatever happens to be uncommitted. A change that leans on an uncommitted helper passes; a change that is fine is refused because somebody else's half-finished edit does not compile. The tree that answers whether a fault was already there has the same leak, and the cache keys are derived from the working tree while the subjects are derived from the index, so the two disagree about what was judged. This is a live defect in the system now gating writes, not a fault in the rebuild, and it is recorded here because the new write path must read unchanged bytes from one named commit rather than repeat it.",
} as const satisfies Finding
