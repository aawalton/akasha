---
id: 91094fb1-d18a-55eb-9b12-00854b4408e0
page-type-slug: finding
title: "Claimed message never reaches the model"
domain-slug: domain/agent-harness
---

# Claim

A message offered to a live seat can go untaken: the model never sees it, the row still says it was accepted, and nothing tells the sender or the recipient. The alert channel is the same channel, so an alert nobody was told about reads exactly like one that never fired. The row's own status does not say which happened, so only `ops seat delivery` separates the two.

# Evidence

Observed 2026-08-16 by this seat, on messages addressed to it.

A CLOSED SET, EVERY MEMBER PROBED. Ten RC-degraded alerts were addressed to this seat between 04:15Z and 06:44Z, which is every one sent in that stretch. Each was put through `ops seat delivery`. Seven read `INJECTED — the model saw it`. Three read `LOST — offered and never taken, and the seat provably moved past it`: `amy` at 04:41:08Z, `awen` at 05:37:39Z, `amy` at 06:35:32Z. The seat was `running` and probed `live` throughout.

THE ROW STATUS IS NOT THE DISCRIMINATOR. Of the four rows sitting at `claimed`, three were lost and one — `awen` at 06:27:13Z — was injected and answered. A delivered message can stay at `claimed` indefinitely, so counting `claimed` rows measures an upper bound and not a loss. Any figure taken from status alone overstates.

IT REACHES OTHER SEATS. Three messages at `claimed` against the live seat `aine-query-performance-operator` were put through the same probe and every one reads `LOST`.

WHAT IT CONTRADICTS. `domains/message.md` states that a message arrives the same way whatever the recipient is doing, and that it reaches the agent it is addressed to. A lost message did neither.

NOT ESTABLISHED. What makes an offered message go untaken. Being part way through a turn holds in one case watched from both ends but was not varied. Whether a redelivery path exists and failed, or none was attempted. Whether the sender is told anything, no send site having been read.
