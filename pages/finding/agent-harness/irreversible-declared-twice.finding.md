---
id: bf5100cf-8df8-5b0e-b87c-381446d8fd35
slug: irreversible-declared-twice
page-type-slug: finding
title: "Eighty-seven of the ninety-one commands documented irreversible are not gated"
domain-slug: domain/agent-harness
---

# Claim

Ninety-one command documents declare `irreversible: true`. Four command files declare it in the help object they export. The help-before-execute gate reads the exported help, so it refuses four verbs and lets the other eighty-seven through untouched.

# Evidence

`tools/hooks/require-ops-help.ts` refuses a declared irreversible verb until the calling agent has read its help. It takes its set from `irreversibleCommands()`, which loads each declared command module and keeps the ones where `module.help?.irreversible === "irreversible"`. Run against the current tree, that yields four verbs: `ali fold`, `ask-alan`, `launcher realign`, `seat send`.

Ninety-one documents under `domains/commands/` carry `irreversible: true` in their frontmatter. The four above are among them. The remaining eighty-seven include `instructions rm`, `instructions write`, `memory rm`, `project deploy`, `project finish`, `project create`, `migration run`, `migration baseline-rebuild`, `page-type hard-delete`, `property-definition hard-delete`, `merge-queue eject`, `talos apply`, `talos bootstrap`, `email messages-send`, `sms send`, `imessage send`, `seat reset` and `seat takeover`.

Driving the hook directly with an agent that has read nothing confirms it, rather than inferring it from the derivation:

- `ops instructions rm --file-path x.md` — not gated
- `ops project deploy` — not gated
- `ops sms send --to x --content y` — not gated
- `ops seat send --to x --content y` — refused

The two declarations disagree and nothing reconciles them. `page-types/ops-command.md` states in Design that "Each command's own document declares whether it is irreversible," which names the document as the authority; the gate reads the code. A command author following the page type writes the frontmatter key, sees it accepted by every gate on the write, and has produced a command the help gate will never refuse.

Closing this is not a small act. Making the derivation read the documents would gate eighty-seven further verbs at once, and every agent would then have to read the help of `instructions rm` and `instructions write` before its next write. That is a fleet-wide stall on the first run, which is why it is recorded here rather than taken.
