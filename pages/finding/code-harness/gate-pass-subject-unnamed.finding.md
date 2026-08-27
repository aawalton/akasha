---
id: 537ca948-2b47-554c-9847-5db1b9680fa8
slug: gate-pass-subject-unnamed
page-type-slug: finding
title: "Gate pass subject unnamed"
domain-slug: domain/global
---

# Claim

An acceptance block that cites a gate's PASS without naming the gate's subject lets a reader mistake evidence about the gate's own subject for evidence about the change under review, and this is structurally systematic across every infra, CLI, docs and schema row that passes the deploy render-gate for reasons unrelated to what it actually changed.

# Evidence

Source: project #16048 (domain in front matter: `code-harness`), status `someday_maybe`, `live-on: deploy`. Carried no objective — captured, never defined; text below is drawn from its capture notes, retired from the row's `notes` attribute on 2026-08-15.

Raised by #16002's worker as a closing question about its own green acceptance.

**Originating case.** #16002's product was a Talos schematic id and a `talosctl` command, touching only `packages/infra/talos/`. Its acceptance carried a `verify-render` green and a deploy render-gate green — both genuine, both verifying three web pages the change could not reach. The worker: "I would skip the render-gate reasoning entirely rather than treat its result as evidence about my change, since it verified three unrelated pages."

**The defect.** Citing a gate result beside a row's own evidence presents a verification of X as one of Y. Hard to see since the gate genuinely ran clean — the defect is in the citation. Judged systematic: every infra, CLI, docs and schema row runs the render-gate for reasons unrelated to the change.

**Why silent omission is wrong.** A clean result is still evidence the deploy was healthy, worth keeping; silence about a gate reads the same as never running it.

**Convention proposed:** name the gate's subject and whether the change intersects it, e.g. "render-gate — subject is three web pages; this change touches only packages/infra/talos/, so it is evidence about deploy health, not the change."

**Generalization noted:** a gate returning clean for reasons unrelated to a change answers in exactly the case it cannot speak to — tied to #16013's schematic POST (creates a clean id for a nonexistent extension) and #16003's truncating log CLI.

**Candidate work, not scoped:** (1) write the convention into the `/p` doctrine, called the whole value; (2, speculative) have the render-gate declare its own subject.

Capture was cut at a paragraph boundary; the above is its head.
