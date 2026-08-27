---
id: f78091ba-7a9c-5b1a-834e-2bdb881154ee
slug: finish-writes-status-past-every-gate
page-type-slug: finding
title: "Finish writes status past every gate"
domain-slug: barred-meaning/project
---

# Claim

`ops project finish` writes a row's terminal status through a direct property write rather than through `move-to`, so no handoff gate, no branch-CI gate and no custody record runs on the one call that closes a row.

# Evidence

Re-measured 2026-08-04, after the direct-landing sentinel was retired. The finding this replaces framed the same verb's defects as consequences of the bypass; the branch-landedness arm was, and is gone with it — a deploy row takes a `project-{seq}` branch again, so `assertBranchLandedOrRefusal` reaches its probe instead of folding "no local branch" to allow. What follows is what survived that and never depended on it.

`packages/alanwalton/projects/cli/src/project/finish.ts`, Step 4, the status write: `updateProjectPageBySeq({ seq, properties: [{ propertyId: "status", value: status }] })`. It is the last step and deliberately so, which is sound — but it sets `status` as a bare property. Every gate that hangs off `move-to` is therefore off the path for the verb whose whole purpose is to move a row to a terminal status. Read directly today.

The `--status` flag carries `choices: PROJECT_STATUS_VALUES` — the whole status vocabulary — while the help two lines above it says "override to move to another terminal status". The flag admits what the sentence forbids, and the flag is what runs. Read directly today.

Not re-measured: the third arm the replaced finding named, that `worktree-ops.ts` derives `worktree_removed` from `!existsSync(dir)` and so reports true for a worktree that never existed. I did not open that file on this pass and state it as unverified rather than carry it forward.
