---
id: f5b9bef4-d7a0-50da-9206-268e8e4ebf02
page-type-slug: finding
title: "Declared model comments promise a helper tier"
domain-slug: domain/agent-fleet
---

# Claim

The declared-model resolver's docstring and the comment at its call site both describe a tier that
reads a persona *or helper* page, matched by the seat's claimed name. The code reads the persona
page type alone, keyed on the persona slot stored on the agent row. A `helper` page type carrying a
logical-model select does exist, so a `defaultModel` set on one is accepted by the interface, never
read, and the seat takes the fleet default as though nothing were configured.

# Evidence

Read 2026-08-07 against `~/code` at `origin/main`.

`resolveDeclaredAgentModel` (`packages/agents/supervisor/src/supervisor-declared-model.ts:118-127`)
feeds `deps.getStoredPersona(agentId)` to `deps.getDeclaredModelForSlug`. `fetchStoredPersonaFromDb`
(`:86-90`) is `readStoredIdentitySlot({ ...agent }, "persona")`; `fetchDeclaredModelForSlugFromDb`
(`:96-105`) queries `pageTypeSlug: PERSONA_PAGE_TYPE_SLUG`, which is `"persona"` at `:58`. One page
type, and no name parsed anywhere. The same docstring says so at `:15-22`: "THE TIER FOLLOWS THE
STORED PERSONA, NOT THE SPELLING OF A HANDLE."

Twenty-five lines below that, `:44-46` says "A HELPER match with no `defaultModel` falls through.
The effectful reads (agent row, persona/helper page, the gate) are injected…". There is no helper
match to fall through. And `supervisor-interactive-spawn.ts:120-123`, the comment directly above the
call, is wrong twice: "a `defaultModel` declared on this agent's persona/helper page (matched by the
claimed name on the agent row…)".

`packages/agents/model-vocab/src/model-vocab.ts:139-144` records that the logical-model select is
"Duplicated across the model select property-definitions on the `claude-account`, `helper`, and
`persona` page-types today", so the property exists on a helper page and nothing reads it.

Nothing catches it. `supervisor-declared-model.unit.test.ts:81-88` pins the fall-through for a
default seat, which passes either way because the injected deps never present a helper page. No
check names either comment. The failure is silent and in the safe direction — the helper takes the
fleet default, which is what it would have taken had the tier never existed.

Which half is wrong is open: either helper pages were meant to be read and the query is short, or
the comments are aspirational. Narrowing the comments is the cheap repair and the dangerous one — it
makes the code correct by definition and disposes of the only record that a helper's declared model
was ever meant to count.
