---
id: 538c7061-ccd1-5409-a3a2-7c32a16d5736
slug: a-seat-file-states-none-of-the-fields-a-route-reads-off-an-agent
page-type-slug: finding
title: "A seat file states none of the fields a route reads off an agent"
domain-slug: domain/agent-harness
---

# Claim

The web route that reaches an agent maps a row through `mapAgentRow`, which reads field names a seat's file does not state. Every field it misses is defaulted rather than refused, so with no agent row live a route resolving a seat by name, reading its liveness and attributing its message fails quietly in every slot but `id` and `title`.

# Evidence

Measured 2026-08-20 against the live repository and the code repo's working tree.

`packages/agents/shared/db-mappers.ts:21` reads `name`, `status`, `persona`, `role`, `principal`, `parent`, `userId`, `concurrency`, `launch`, `deferredRestartNotice`, `createdAt` and `updatedAt`. `packages/alanwalton/web/app/routes/api.persona.message.ts` reaches it.

`memory:seats/nimue.md` states `title`, `persona-slug`, `domain-slug`, `role-slug`, `person-slug`, `start-mode`, `on-call`, `initiative-slug` and `claude-code-session-uuid`, and nothing else. Kebab keys camelise to `personaSlug`, `roleSlug` and `personSlug`, none of which is a key the mapper reads. The seat states no `presence` at all: its `seats/nimue.fast.yaml` holds `supervisor-process`, `turn-state` and `turn-start`, and presence is composed rather than stated.

Nothing raises. The mapper defaults `name`, `persona`, `role`, `principal`, `parent`, `launch` and `deferredRestartNotice` to null, `status` and `userId` to the empty string, and `concurrency` to 1.

All 2,448 agent rows were retired on 2026-08-20 at 14:43 UTC, so there is no row left for the mapper to read.

The addressing half of this is closed and is not what remains: `public.messages` carries `target_seat_name` and `sender_seat_name`, and no foreign key anywhere in the database references `public.pages`.
