---
id: 931938f5-b967-51e2-8ce2-a6163cec0787
page-type-slug: finding
title: "Approval not recorded on the row"
domain-slug: domain/person-authority-feature-approval
---

# Claim

A project opened on a person's ask records nothing about the approved request it rested on, so the approval that let it through cannot be found again from the row.

# Evidence

`ops project create --requesting-user` requires `--feature-request` and refuses unless that request carries the person as its requester and an approval whose authority still stands. The id it checked reaches no carrier: it is read into the decision and dropped, and the row keeps `requestingUser` alone.

Met on #18417, a row homed to amy at `awaiting_lead_definition` naming Ki as requesting user. Nothing on the row, in its document or in the issue store said which request it answered — the ephemeral one standing in that window had been created ten minutes after the row and soft-deleted a minute later, so it could not have been the one. Establishing that the row was a verification artifact rather than Ki's real ask took reading the fixtures, the sibling cleanup commits and the verifying project's own notes.

Not measured: whether any row created this way carries the id somewhere unread here, and how many such rows stand — one was met and the population was not counted.
