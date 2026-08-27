---
id: 3c38231a-a182-55d4-80f8-e9dbc5e804c2
slug: decider-hold-reasons-deleted
page-type-slug: finding
title: "The recorded reasons four deciders stayed in the code repository were deleted and three no longer hold"
domain-slug: domain/agent-harness
---

# Claim

The recorded reasons four deciders stayed in the code repository were deleted four days after they were written, and three of the four reasons no longer hold.

# Evidence

On 2026-08-10, commit `ecb5613c09` wrote onto four files in `packages/agents/shared` why each had not crossed to the instructions repository, stating in its own message that until then the reason lived only in the project record, and that "nobody got to it" is indistinguishable from "it was weighed and held" at the point where someone is deciding whether to try again.

On 2026-08-14, commit `2fdad2be73` removed every comment standing outside the code comment forms from `packages/agents` — 17,646 of them across 945 files. The four reasons went with them. The commit is correct against `domains/code-comment.md`; nothing carried the reasons anywhere else first, so they now stand only in git history.

Read back out of that history on 2026-08-18, three of the four no longer hold:

- `decide-dead-recipient-routing` was held by `packages/agents/supervisor/src/wake-watcher-send-agreement.fixture.cli.test.ts` calling it directly. That fixture was deleted with the wake-watcher cluster on project 19401, commit `99a337b520`.
- `held-wake-decide` was held by its suite sweeping `PROJECT_STATUS_VALUES` and `HOLDER_PARK_STATUSES`, a second copy of the status vocabulary being the cost. That vocabulary now stands in the instructions repository as `page-types/project-status-value.md` with `tools/lib/project-statuses.ts` and `tools/lib/project-status.ts` reading it.
- `blocked-on-clear-decide` was held by a property suite needing `fast-check`. `domains/tasks/agent-harness/port-supervisor-file.md` now states the remedy in stage 4: re-express such a suite as an exhaustive loop over the generator's whole range, which covers more than sampling did.

The fourth, `agent-liveness-decide`, was held by twenty-five test files across four packages reaching it, several synchronously. That count has not been re-measured against the tree as it stands today.

All four files still stand in `packages/agents/shared` and none is ported.
