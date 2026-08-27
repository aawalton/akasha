---
id: c0b25abb-9c6f-50e0-8a43-7256761f438c
page-type-slug: finding
title: "Domain edges silent run directly"
domain-slug: domain/global
---

# Claim

`tools/checks/domain-edges.ts` prints nothing and exits 0 when run directly, reporting only through `ops instructions run-checks`, so a seat invoking it as a command cannot tell a passing estate from a check that did nothing.

# Evidence

Run directly: `bun tools/checks/domain-edges.ts` produces no output and exits 0. Through the door: `ops instructions run-checks --check domain-edges` reports "177 domain(s) and 191 parent edge(s) across 177 surfaces on the perimeter; 14 name several parents and 14 rank one of them; 40 persona(s) hold a territory of which 40 are named back, and 0 domain(s) reach none".

The vera reading tested it against a mutated copy and it stayed silent there too, so the direct invocation is blind rather than merely terse.

Six reviewing seats this pass met that silence and each built the same workaround unaided — driving `ops instructions champions` in both directions and putting negative controls through it (`--persona nosuchpersona` exits 1, `--persona claude` returns "holds no territory"). `domains/role.md`'s Negative Control names this exact case: a blind instrument and a clean one both return nothing, and the empty never flickers.
