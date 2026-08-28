---
page-type-slug: finding
title: "The design-token check's new-module guard enumerates the shims, not where colour modules now arrive"
domain-slug: domain/design-tokens
slug: new-module-guard-reads-the-shims
---

# Claim

`check-design-tokens` still holds every colour it reads against `tokens.css`, and it passes, so
the fourteen values that moved into `akasha/design-tokens/` on 2026-08-26 are watched. Its guard
against a colour module it does *not* read is a separate mechanism, and that one was left behind
by the move: it enumerates `shared/design-tokens/src`, a directory
which now holds three re-export shims and no numbers. A colour module added to
`design-tokens/` with no shim beside it falls outside that enumeration, and nothing refuses.

`pages/domain/check.domain.md` carries "Derive a check's reach wherever a new member can arrive,
never from a list in the check". After the move, a new member can arrive in a directory this check
never reads.

The parity half of the check was proved by running it. The reach half was read off the source and
not proved: establishing it would mean adding a colour module, which is a change to a section
under another agent's hand.

# Evidence

## What moved

`akasha` `7ef0a86` (2026-08-26 14:03:44) created `design-tokens/{surface,semantic,text}.ts`, holding
`Rgb`, five surfaces, six semantic colours and three text greys. `code` `5c7f6fb1aa` (14:04:19)
replaced the bodies of `packages/shared/design/tokens/src/{surface,semantic,text}.ts` with
`export { … } from "../../../../../../akasha/design-tokens/…"`. `code-editor` `5675029` (14:06:18)
repointed `extensions/ops/src/palette.ts` at akasha directly. The numbers left the code repository;
the directory did not.

## The parity half passes, and was run

    WORKSPACE=~/repos/akasha bun infra/cluster-checks/src/checks/check-design-tokens.ts

answers `Every design-token colour is declared on both sides and every tuple matches its oklch()
source. [over 14 of 14 color tokens] [read under: /var/home/walton/repos/code/packages/shared/design/tokens/src]`

It loads `@shared/design-tokens/surface`, `/semantic` and `/text` through `codeModule` at run time
(`check-design-tokens.ts` lines 129-135). Those specifiers resolve to the shims, and the shims
re-export akasha, so the values compared are akasha's. The mirror is guarded.

Independently: converting `shared/design-system/src/styles/tokens.css` from oklch to sRGB
reproduces all fourteen akasha tuples to the last digit — `oklch(0.57 0.12 155)` gives
`[0.1761, 0.5476, 0.3416]`, which is `GREEN`. The akasha files are a derived mirror of the
stylesheet, carrying no generated-file header and no path saying so, so by
`pages/domain/generated-file.domain.md` they read as authored.

## The reach half, read from the source

`check-design-tokens.ts` line 28 sets `TOKENS_SRC_REL = "shared/design-tokens/src"`.
Line 112 calls `unreadTokenModules(`${repoRoot}/${TOKENS_SRC_REL}`)`, which lists the `.ts` files in
that directory and returns those not in `READ_MODULES` (line 28: `surface.ts`, `semantic.ts`,
`text.ts`). Lines 116-123 turn a non-empty result into a tool error whose text is "@shared/design-tokens
exports every file in that directory, so any colour in one is outside this comparison and this run
certifies nothing about it."

That sentence was true when the numbers were in that directory. `repoRoot` is the code checkout;
`akasha/design-tokens` is never enumerated, and no flag points the enumeration anywhere else. The
directory read is what makes the check's membership `enumerated` rather than a list — its own
`because` (line 160) says the members are read "off each loaded module rather than off a list here,
which a directory read makes a refusal to miss a module of". The directory it reads is no longer the
one modules arrive in.

## What the exposure is

`ops file-structure uses design-tokens` reports three doors, and `git grep -l "akasha/design-tokens"`
finds five importing files in two repositories: `code/packages/shared/design/tokens/src/{surface,
semantic,text}.ts` and `code-editor/extensions/ops/src/palette.ts` with its unit test. A fourth
akasha module would be reachable by any of them by relative path without a shim existing, since the
importers spell akasha by path rather than through the package name.

Whether the rest of `tokens.css` follows the palette into akasha is open: `--radius`, `--spacing-*`
and `--state-*` are design tokens by `pages/domain/design-tokens.domain.md`'s definition and are not
there. If they follow, new modules arrive in akasha and this gap is load-bearing. If they do not,
the folder holds only the palette and the gap stays theoretical.
