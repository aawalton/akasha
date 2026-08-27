---
id: 4cc84d32-b671-5960-b294-125f816302cd
slug: name-bind-reads-tree-from-pod
page-type-slug: finding
title: "Name bind reads tree from pod"
domain-slug: domain/agent-harness
---

# Claim

The agent-name bind reads the instructions tree as files, and the web pod has no such tree, so minting a named agent row from the pod throws. That is the handler cold-start path: a person with no handler seat yet who sends an SMS or a page-chat message gets no seat and no message stored, because `mintNamedAgent` deletes the row it minted and rethrows. Four of the five tree reads are gone as of `2f085a995`; the fifth still breaks the path.

# Evidence

`api.sms.webhook.ts` and `api.persona.message.ts` reach `handler-cold-start.ts`, which calls `mintNamedAgent`, then `setAgentName`, then `gatherAgentNameBindInput` in `agent-name-bind.ts`. `packages/alanwalton/web/deploy/k8s/synth.ts` mounts no instructions volume and sets no `INSTRUCTIONS_ROOT`.

FIXED. The gather took `getRoleVocabulary`, `getDomainVocabulary`, `readTaskCorpus` and `readPersonSlugs` off the tree and onto the `agent` page type's projected option lists, read in one act by `@agents/shared/seat-vocabulary-rows`. Verified 2026-08-11 against production: 14 roles, 442 domains, 38 tasks, 7 persons, each matching the corpus. The `person` property-definition did not exist at all until it was created that day, so `ops seat project-seat` would also have thrown on the seventh list `eca0ef070` taught it to write.

STILL BROKEN, AND IT WAS THE UNMEASURED LEG. `getPersonaRoster`, which the gather calls first, is not database-only: it reads `domains/personas` through `persona-corpus`. The earlier reading could not see this, the four reads above throwing first. Run against an empty root on 2026-08-11 with the four coming from rows, the gather throws in `persona-corpus` on `domains/personas`, ENOENT. The cold-start path fails on one reader rather than four.

A `persona` option list with 41 entries already stands on the rows, so the same move is available. What needs settling first is `protectedSlugs`, the second value that function returns and the one the bind refuses on.

Not measured, still: whether the path is exercised at all. It fires only for a person holding no handler seat yet, and reading the deployed pod's logs is with Alan.
