---
id: 7aa274d4-186e-5a54-9c7a-412227a392bf
slug: persona-file-tier-unread
page-type-slug: finding
title: "Persona file tier unread"
domain-slug: domain/alanwalton-app
---

# Claim

The persona file tier is read by nothing. `persona-resolve.ts` holds the file-wins-else-row precedence over 40 committed `<slug>.persona.ts` fragments, and it, `getPersonaSpec` and `discoverPersonaSpecs` are referenced only by its own unit test and the `personas-core` barrel — no live call site. Its docblock states the boot precedence as fact, so it misdescribes how a seat actually resolves.

# Evidence

Measured 2026-08-07 against `~/code`, while emptying `dirty/skills/persona-craft/findings.md`. That document recorded the same shape on 2026-07-29 against `register-resolve.ts` and `<slug>.register.ts` fragments. Those are gone — only `dist/src/register-resolve.d.ts` survives, and there is no `register-specs/`. The module was renamed, not repaired.

`packages/alanwalton/personas/core/src/persona-resolve.ts` exports `pickPersona` and `resolvePersona`. Searching `personas/core` and `packages/agents` for either returns the module, its unit test, `index.ts`, and two `agents/shared` files matching only `resolvePersonaChatMirror`, an unrelated function. `personas/cli/src/persona/resolve.ts:193` exports a DIFFERENT `resolvePersona` with many live callers; that collision is what makes a bare search read as though the core one were reached.

Nothing imports it from the barrel. A multiline pattern — `import {…resolvePersona…} from "@alanwalton/personas-core"`, run multiline because an import list wraps — returns no matches across `~/code` outside `dist/`. The same pattern over `getPersonaSpec`, `discoverPersonaSpecs` and `PersonaSpec` also returns nothing.

So the reach is wider than an unused function. `getPersonaSpec` and `discoverPersonaSpecs` appear only in `persona-resolve.ts`, `persona-resolve.unit.test.ts` and `index.ts:137`. The 40 `*.persona.ts` fragments under `persona-specs/`, discovered by glob, are read by no live path.

What it costs is what the module says about itself. Its docblock opens "Which tier supplies a persona at boot" and states the precedence as operative — "the fragment is the persona, not a patch over the row". A reader establishing how a persona resolves finds a confident, specific answer describing a path nothing takes. The manifest presupposes a live reader too, warning that a mismatched filename would make a seat "take its identity from the wrong tier".

Not established: what DOES supply a persona at boot now. I read the module graph, not a boot.
