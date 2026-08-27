---
id: 5bb86473-6b61-540b-9f17-fd444eeadbce
slug: person-arm-could-claim-a-domain-segment
page-type-slug: finding
title: "Person arm could claim a domain segment"
domain-slug: domain/seat-name
---

# Claim

The person arm of `packages/agents/shared/agent-name-grammar.ts` runs before the composed-identity arm and splits on the role vocabulary alone, so a role slug beginning with a domain segment would let it claim a composed seat name. A role named `harness-something` would make `alan-harness-...` read as person `alan` holding that role rather than as the `alan-harness` domain. No such role exists, so nothing is wrong today — but authoring one reopens the class #18032 closed.

# Evidence

Raised by the seat delivering #18032 as a sharp edge its own change introduces, carried unchanged into the verification on 2026-08-06 rather than fixed. The seat declined to spend a second deploy cycle on it and was right to.

The order is what makes it reachable: the person arm is tried before the composed-identity arm, and it recognises a person by membership in `PEOPLE` followed by a role token drawn from the role vocabulary. Neither test asks whether the remainder would parse as a domain, so the first arm to match wins.

Verified on the deployed tree at `492e9043` that today's names are unaffected: `alan`, `alan-handler`, `ki-handler` and `jenny-handler` all parse as `person`, `amy-handler` parses as `composed-identity` despite its head being a declared persona, and `garbage-developer` is refused. The hazard needs a role slug that does not exist, which is why it is filed rather than fixed.
