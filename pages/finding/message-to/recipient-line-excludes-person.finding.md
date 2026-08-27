---
id: c4e983a1-2ae9-52b9-a034-8fd775c3a50b
slug: recipient-line-excludes-person
page-type-slug: finding
title: "Recipient line excludes person"
domain-slug: page-property-definition/message-to
---

# Claim

The first Design line of `domains/message-to.md` is false: a message can also state a person, and a person is not an agent.

# Evidence

The line reads "A message states what its recipient must have, never who they are, other than an agent addressed directly." Reported by the review of `domains/message-to.md` on 2026-08-15, which verified `--person` against `ops seat send --help` ("being that person is the whole address"), `tools/lib/message-to-person.ts` and line 189 of `tools/commands/seat/send.ts`; `domains/message-to-person.md` is a child of this domain and `domains/commands/ops-agent-send.md` defines the verb as "a message written to one agent or person". The reviewer reports the surviving clause is a one-item enumeration of the kind commit 13e640012 already found stale on the parent. It offered two repairs and settled on neither: widen the exception to "an agent or a person addressed directly", true today but re-adding an enumeration that went stale unnoticed once; or state the split with no enumeration, leaving the forms wholly with the children. It recommends the second. Neither was landed, the line sitting in a Design section. Nothing was re-verified here.
