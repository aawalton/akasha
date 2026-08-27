---
id: e5c3a36f-b9af-54e9-bb7f-3139718a5253
slug: merge-borne-resolution-cannot-land
page-type-slug: finding
title: "Merge borne resolution cannot land"
domain-slug: domain/global
---

# Claim

Merging `main` into a feature branch makes `main` an ancestor of HEAD, which is the predicate `ops project deploy` reads to skip its sync phase. The merge conceals itself: it satisfies the test that would otherwise have flattened the branch, so nothing linearizes it. It reaches the merge queue as written, and the queue lands by cherry-picking a commit range — dropping any resolution held in the merge and ejecting on the original conflict.

# Evidence

#19011 was ejected at queue entry 11557: "cherry-pick conflict on 0c25044: error: could not apply 6c5c288c78". It carried `f7dfc1ec51`, "merge main, resolving the one delete/modify conflict toward the deletion", on `packages/agents/cli/src/agent/in-flight.ts`. Its commit body states the belief that produced the failure:

  "Landed deliberately here rather than left to the merge queue. The queue rebases, so a
   rebase meeting a modify/delete conflict alone fails the deploy."

The premise is right and the conclusion inverts it: because the queue rebases, a resolution held in a merge commit is what the replay drops.

The skip predicate, `move-to-deploy.ts:270-275`:

  mainAlreadyMerged = runGit(["merge-base", "--is-ancestor", "origin/main", "HEAD"]).ok
  alreadySyncedAndPushed = mainAlreadyMerged && remoteRef.ok && localSha === remoteRef.stdout

A merge of `main` sets the first conjunct. #19011 met all three and sync printed "already synced and pushed, skipping phases 1-3".

BEING BEHIND MAIN IS THE HANDLED CASE. Sync rebases first, and a conflict there returns `step: "deploy_sync"` with nothing pushed and no entry minted (`move-to-deploy-helpers.ts:228-233`).

The queue cherry-picks a range and has no merge mode (`coordinator/src/coordinator/cherry-pick-entries.ts:156`); `merge_method` is written afterwards and selects nothing.

Escape routes are closed to a seat: `git rebase`, `git reset` and force-push are refused by workstation hooks, a new branch ref by the remote pre-receive hook. The remedy is `ops project rebase` then `ops project push --force-with-lease`; nothing in the deploy help or the ejection message names it.
