---
id: 86ce6caa-f313-5a6c-8d1e-ff3077f81801
page-type-slug: finding
title: "Blocked warrant self named"
domain-slug: domain/agent-fleet
---

# Claim

The wake-warrant seam cannot refuse an unearned wake, because the caller names the party it claims is blocked and `ops seat send` names the caller. `decideEmission` refuses the two spelling mismatches — a warrantless envelope that revives, and a warranted one that revives nobody — but on the `blocked` arm it only asks that the named id is not empty. `send.ts` defaults that id to the sender's own, so an ordinary send mints a well-formed warrant whether or not anybody is waiting.

# Evidence

Read from source at `~/code` `ecf5f9518f`. I ran nothing.

`decideEmission` is at `packages/agents/shared/wake-warrant.ts:180`. It compares the declared warrant against `emissionWakes(envelope)`, which asks whether the row's source matches a declared wake source. Its header names the two failures it exists to refuse: "An announce spelled as a wake" and "A wake spelled as an announce". Both are spelling against effect.

On the `blocked` arm, the whole of what it asks about the named party is `warrant.blockedAgentId.trim().length === 0`, refusing an empty one as "the announce shape wearing a wake's name". Nothing compares the id against any record of what that agent is waiting on.

`packages/agents/cli/src/agent/send.ts:354` supplies that id: `const blockedAgentId = blockedFlag === undefined ? senderAgentId : await resolveBlocked(blockedFlag)`. The comment above it states the bar being met — "The named party must exist" — and the sender does exist. The warrant passed on is `{ kind: "blocked", blockedAgentId }`, which satisfies every arm.

Not the finding beside it. `pages/finding/agent-fleet/ratification-arming-unseen.finding.md` is the `ratified-interrupt` arm, defeated by page-row data the pure decider cannot see. This is the `blocked` arm, defeated by a default in the CLI that calls it. A repair to either leaves the other standing. I read it whole before filing this.

Not measured. I did not count how many sends carry `--blocked` explicitly, did not read its documentation, and did not look for any instrument outside `decideEmission` that observes unearned wakes. Nothing here shows a particular send was unearned — only that the decider's inputs cannot tell.

Filed rather than left where it was found. It stood in `dirty/questions/outward-act-doctrine.md`, which this seat emptied and removed; git holds the text. The normative half of the same entry survives a repair to this seam and was kept under quarantine instead, at `dirty/maybe-keep/questions/outward-act-doctrine.md`.
