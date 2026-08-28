---
id: df4072c2-dddd-5cee-82f0-8136a90868ac
slug: panel-toggle-double-mount
page-type-slug: finding
title: "Panel toggle double mount"
domain-slug: web-app/alanwalton-web
---

# Claim

The Mod+K palette's "Expand / collapse all panels" command (Ctrl+Alt+T) is registered and fires twice in production because `panel-toggle-provider.tsx:31` (design-layout) mounts more than once per page, duplicating the `useKeyboardBinding` id `panel.toggle-all`; since the registry fires all matches on a shared id by design, this may make the command a functional no-op from the palette, a hypothesis not yet verified.

# Evidence

Project #15900, domain `alanwalton-web`, status `someday_maybe`, `live-on: deploy`.

Surfaced by #15865 (nav palette wiring); pre-existing, not introduced by it (#15865's own ids are all distinct). Root file `panel-toggle-provider.tsx:31`, owned by design-layout; may re-home there, captured under astra because the keyboard rollout surfaced it.

History:

- 2026-07-25T03:24:06Z, olwen (keyboard-registry owner): an earlier fix candidate — dedupe registrations by id at the registry level — is struck, since the registry documents fire-all-on-shared-ids, so a duplicate id genuinely runs the action twice; de-duping the display would hide the double-fire rather than fix it. Only mounting the provider once per page is valid. A registry-level "reject duplicate ids" guard was considered and deferred: one instance, a mount bug not an id-collision-by-design problem, so Rule of Three does not justify it yet; a second instance would likely justify it.
- Escalation, unverified: `panel.toggle-all` is a toggle, so two fires may net to a no-op, meaning the command could be functionally dead from the palette, not just cosmetically duplicated. Verify on a local dev server, not prod (avoids mutating Alan's live UI state under an unconfirmed session identity), by invoking it and observing whether panel state changes — predicted no change — before fixing the mount, for a real before/after. olwen deliberately left this unverified.
- 2026-07-25T03:26:31Z, olwen confirmed independently in production (alanwalton.com/home): the palette lists the command twice, live, and it affects the keyboard chord path too, not just the palette list.
- Registry owner confirmed fire-all-on-shared-ids is intentional by construction (`matchBindings`/`selectBindingsById` use filter semantics, documented in the package CLAUDE.md), but knows no consumer relying on it — so the defect is entirely the double mount.
