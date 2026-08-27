---
id: 43367e07-dbe4-5508-bc53-661d02f650e4
slug: persona-line-carries-its-reason
page-type-slug: finding
title: "Persona line carries its reason"
domain-slug: page-property-definition/message-to
---

# Claim

The second clause of the persona Design line on `domains/message-to.md`, "naming her domain names her", is the reason the first clause works rather than an invariant of its own.

# Evidence

Reported by the review of `domains/message-to.md` on 2026-08-15. `domains/domain-design.md` states that a Design entry carries no reason for itself, and `page-types/persona.md` already states "A persona is derived from a domain rather than chosen beside one". The reviewer verified the derivation in `tools/lib/recipient-derivation.ts`, where `resolveDomainLead` walks `persona-champion-slug:` up the domain tree. It landed the trim in dedca8868 and restored it in 69202910e, on the reading that Every Changed Line reserves a changed Design line to Alan and that a review may land alone only a false one. Nothing was re-verified here.
