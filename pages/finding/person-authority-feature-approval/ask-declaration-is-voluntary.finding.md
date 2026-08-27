---
id: 533ffa5d-99ad-5d94-975f-086185e34c15
page-type-slug: finding
title: "Ask declaration is voluntary"
domain-slug: domain/person-authority-feature-approval
---

# Claim

Whether work was opened on a person's ask is decided by whoever opens it, and a project opened on one without declaring it is indistinguishable afterwards from work the fleet opened for itself.

# Evidence

Read and driven on 2026-08-11 in the code repository, against `8f79cee95f` on `main`.

Both project-opening verbs now run the same gate. `ops project create --requesting-user <id>` and `ops project start --requesting-user <id>` each refuse with the same sentence when no `--feature-request` names the approved ask, and each refuses again when the id names no issue page. Driven through both verbs; no row was written by either.

What remains is upstream of the gate. `packages/alanwalton/projects/cli/src/pure/decide-ask-approval.ts:38` returns `unrequested` before any read when no requesting user is named, which is deliberate and argued in its own header: every project the fleet opens for itself carries no requesting user, so a guard reading the record first would refuse the fleet's own work whenever the record was unreachable.

The consequence is that the declaration is voluntary. A seat acting on something Ki or Jenny asked for can open the row with neither flag, and the row that results carries no requester, no approval and nothing recording that a person asked. `domains/tasks/handler/handle-inbound.md` now tells a handler to submit anything that would be built as a feature request naming its person, which routes the ordinary case; nothing measures a route not taken.

What this does NOT claim: that any project has been opened this way. That was not measured. The observation is about what the gate can see.
