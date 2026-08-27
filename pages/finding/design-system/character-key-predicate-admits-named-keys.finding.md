---
id: 42128ffd-6368-52f0-a158-9c34ff629943
slug: character-key-predicate-admits-named-keys
page-type-slug: finding
title: "Character key predicate admits named keys"
domain-slug: domain/design-system
---

# Claim

`isCharacterKeyChord` in the design system's keyboard registry matches any chord carrying no
modifier, including named keys, while its docblock calls it "the exact scope of WCAG 2.1.4 Character
Key Shortcuts". A modifier-less `Escape` or `ArrowDown` binding therefore satisfies it and is
suppressed by the global disable-toggle, though 2.1.4 covers only letter, punctuation, number and
symbol characters. No chord registered in the tree today separates the two, so nothing observable is
wrong.

# Evidence

`packages/shared/design/primitives/src/utils/keyboard-registry.ts:150` is the whole function:
`return !chord.mod && !chord.ctrl && !chord.meta && !chord.alt`. It reads `chord.key` not at all.
The docblock at lines 144–149 says "True when a chord is a bare printable character — the exact
scope of WCAG 2.1.4 Character Key Shortcuts", and explains only why `shift` is not exempting.

It runs through `matchBindings` at line 191: `if (!ctx.shortcutsEnabled && isCharacterKeyChord(parsed))
return false`. With the toggle off, a modifier-less named-key binding is dropped on the same footing
as `?`. The same file tells the kinds apart where it needs to — `isShiftSensitive` at line 131 tests
`key.length === 1`, `keyMatches` at line 138 branches on `/^[a-z]$/` and `/^[0-9]$/` — so the
narrower test is written twice nearby.

Nothing reaches it. `rg -n 'chord:\s*"'` over `*.ts` and `*.tsx` outside test files returns
`Mod+Alt+A`, `Mod+Alt+T`, `Mod+K` and `?`; every one carries a modifier or is printable. The unit
test at `keyboard-registry.unit.test.ts:85` asserts `t`, `?` and `Shift+/` true and `Mod+K`, `Ctrl+X`
false — both sides, never a modifier-less named key — so it is green either way.

WHAT I DID NOT MEASURE. I read the source at `ecf5f9518f` rather than running any application, so I
observed no key press with the toggle off. I did not check for a lint rule or audit elsewhere
reporting this. My chord enumeration filtered test files out of the results, so a chord registered
from a fixture I dropped would not appear, and I did not sweep for chords built at runtime rather
than written as literals. I did not read the WCAG text, taking its scope from the docblock.
