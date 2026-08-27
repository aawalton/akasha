---
id: 04925999-0d57-5405-85aa-44e3b3abc96e
page-type-slug: finding
title: "Project-row readers outlive the rows"
domain-slug: repo/code-repo
---

# Claim

Production holds no `project` page row, and five readers of one still stand in the code repository. One is a live deployed readout; the rest are dead code and refusal prose describing a row that is gone.

# Evidence

Measured on the code repository's local `main` at `fc0a750b90` on 2026-08-19, by `git grep` over tracked files only. `dist/` trees are untracked build output and were excluded; several still carry a `ProjectStatus` vocabulary the sources no longer have.

Commit `5515b94c27` states 14,806 project rows and 28,824 version rows hard-deleted, drops the `pages_requesting_user_select` policy, and clears `get_inbox_readings`. Nothing under `packages/shared/supabase/database` names `'project'` or `requesting_user` now.

Live, over what is now an empty set: `packages/shared/status-bar-access/src/project-query-service.ts` asks the page query service for `/q/projects-with-lineage` and `/finished`, and `packages/alanwalton/web/app/routes/api.project-counts.ts` serves the fold to Alan's readout.

Dead, with no importer outside its own test: in `packages/alanwalton/projects/core/src/lib/project-track.ts`, `ProjectTrack()` and `recordedProjectTrack()` take a page row's `parentKey` and `hasChildren` — only the `ProjectTrackName` type is still imported, and the instructions repo derives track from files in `tools/lib/project-ladders.ts`. In `provenance-stamp.ts` beside it, `REQUESTING_USER_ATTR`, `REQUESTING_AGENT_ATTR` and `parseAgentId`; the policy that was `requestingUser`'s one consumer went with the rows.

Standing but describing nothing: all three refusal messages in `packages/alanwalton/projects/cli/src/pure/decide-create-domain.ts` narrate a row, and a user meets them on `ops project create`. That command's `--requesting-user` still runs `gateAskApproval`, and `tools/commands/project/create.ts` discards the id it returns.

Not measured: whether `/q/projects-with-lineage` returns zero. The page query service's server is not in this repository and runs in-cluster, so this covers the client and the route only.
