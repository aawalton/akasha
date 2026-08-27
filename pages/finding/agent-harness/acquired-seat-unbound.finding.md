---
id: 9dc40755-1703-550d-9ee5-ea1c4422b505
slug: acquired-seat-unbound
page-type-slug: finding
title: "Acquired seat unbound"
domain-slug: domain/agent-harness
---

# Claim

A seat acquired by a name that spells persona, domain and role comes up holding none of them. `ops seat acquire --name abby-all-about-alan-recorder` spawns a generic worker: the name is a handle to look up an on-demand spec, not a statement of attributes, and attributes are stated by the seat itself through `tools/seat.ts` after boot. So the seat boots governed by nothing its name describes, and the name it answers to is not the one that was asked for.

# Evidence

Session `38501837` on 2026-08-06. An interviewer's recorder died mid-session and was respawned:

    bun ops seat acquire --name abby-all-about-alan-recorder \
      --prompt-file … --agent-id 019fd746-…

The call reported `019fd8b3-27d8-7fa4-a68c-4d5fc4dc9aff  abby-all-about-alan-recorder  spawned`, which reads as success. `ops seat list` then showed that id under persona `claude`, name `claude-global-worker`. The requested name resolved to nothing, and an immediate `ops seat send abby-all-about-alan-recorder` failed with `No agent currently holds the name`.

So the seat was live, addressable only by id, and governed by none of `domains/personas/abby.md`, `domains/roles/recorder.md` or `domains/folders/all-about-alan.md` — while holding a prompt telling it to write to a corpus those documents govern. Two rules on the last of those decide whether such writes are sound at all: never write a claim about Alan he has not made, and write every note in his first person. Nothing was compelling either.

It was caught only because the send-by-name failed and prompted a look at the roster. Had the name happened to resolve, an unbound seat writing into a governed corpus would have looked identical to a bound one from outside.

The repair was to message the seat and have it state its own attributes:

    bun ~/instructions/tools/seat.ts --persona abby --domain all-about-alan --role recorder

after which `ops seat list` showed it as `abby-all-about-alan-recorder` under persona `abby`. `acquire --help` is accurate about this — it describes the name as a handle consulted against a registered `OnDemandAgentSpec`, and says every name without one resolves to a clean default spawn. The trap is that a name spelling three attributes reads as a request for them, and the success line prints the name back.
