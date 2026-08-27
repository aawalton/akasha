---
id: 20d7d440-d9d1-5278-9425-b71ed356e29b
page-type-slug: finding
title: "Property sanitizes before embedding"
domain-slug: domain/global
---

# Claim

The `scanProseFlagHazards` property test sanitizes in the wrong order: it strips `$(` from the payload, then removes `"` when embedding it, and that removal re-creates `$(` out of `$"(`. The subject is correct and the property is wrong, so trees eject on whichever seeds happen to reach such a string.

# Evidence

Reported twice independently on 2026-08-02, by the seats holding #17438 and #17435. The first had its second attempt ejected by it: `packages/infra/scripts`, `scanProseFlagHazards over the full input space > never refuses a command with no shell-active syntax in it`, counterexample `["#$\"("]`, seed `-1670231828`, path `77:1:3:2:2:2:19`.

Derived here rather than taken on report. `src/shell-active-prose-flag.property.test.ts:26` computes `inert` by stripping backticks, `$(` and `${` from the drawn payload; line 27 then embeds `inert.replaceAll('"', "")`. The strip runs before the quote removal, so a payload containing `$"(` carries no `$(` when it is checked and acquires one when it is assembled.

Run against the module as it stands:

    payload   "#$\"("
    inert     "#$\"("     <- `$(` stripped, none present to strip
    embedded  "#$("       <- removing the quote CREATED `$(`
    command   bun ops seat send x --content "#$("
    hazards   [{ command: "agent send", flag: "--content", syntaxes: ["command-substitution"] }]

So the scanner does exactly what it is for: the command it was handed does contain a command substitution. What is false is the test's belief that it had built an inert string. The leading `#` is incidental — the trigger is the three characters `$"(` in that order.

What makes it worth filing rather than fixing in place is the failure mode. `fast-check` draws a fresh seed per run, so this is a random ejection rather than a red that reproduces: a tree meets it, another does not, and nothing distinguishes it from flake. Two seats reached it on different rows within a day.

Remedy, named and not applied since this is not my domain: remove the quotes first and compute `inert` from that string, so what is asserted inert is the string actually embedded.

Not measured: whether the sibling properties in the same file share the ordering, and how many ejections already attributed to flake were this.
