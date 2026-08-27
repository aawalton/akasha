---
id: 7d579ed0-4d5b-5ddb-87b3-3290fe64eda9
page-type-slug: finding
title: "A stale project seq on the row widens a seat's inbox"
domain-slug: page-type/seat
---

# Claim

A seat's row keeps the `projectSeq` of a project the seat has since left, and the recipient resolver reads that key every tick to widen the seat's inbox, so the seat is offered messages addressed to a project it is not working under.

# Evidence

Measured on 2026-08-19 against every name the recipient resolver can be armed with. Two rows carry a `projectSeq` their seat's page does not. `thea` is running, her page stands, it names `person-slug: alan` and `on-call: true` and no project at all, and her row reads `projectSeq` 19425. `ryn` is stopped, the last page in her history names no project, and her row reads 19431. No other name disagreed.

`getAgentByName` in `tools/lib/recipient-resolver-db.ts` returns `project_seq` off the row, and `readInbound` in `tools/lib/recipient-resolver-deps.ts` passes it to `getAgentInboundMessages` as the widening. Whether either seat has in fact been offered a message from its old project was not checked.
