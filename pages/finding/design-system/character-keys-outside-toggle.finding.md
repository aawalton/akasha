---
id: 7a73cb27-d886-51a0-a942-05d93b03f0bc
slug: character-keys-outside-toggle
page-type-slug: finding
title: "Character keys outside toggle"
domain-slug: domain/design-system
---

# Claim

Three keyboard shortcuts in the products' web interfaces are bare character keys standing outside the design system's global disable toggle: `q` in alanwalton's app shell, and `j`, `k` and Space on audhdalan's autcon-2026 deck. Each sits on a `document` or `window` keydown listener of its own rather than the shared keyboard registry, so each fires whether the toggle is on or off and none appears in the `?` sheet or the `Mod+K` palette. WCAG 2.1.4 is the criterion the registry's character-key floor implements.

# Evidence

`alanwalton/web/app/components/app-shell.tsx:188` tests `e.key.toLowerCase() === "q" && !e.metaKey && !e.ctrlKey && !e.altKey`, in a handler added at line 193 with `document.addEventListener("keydown", handler)`. `audhdalan/web/app/routes/autcon-2026/deck-page-content.tsx` switches on `" "`, `"j"` and `"k"` beside the arrow keys, behind a hand-written `instanceof HTMLInputElement || instanceof HTMLTextAreaElement` guard, on a handler added at line 90 with `window.addEventListener`. Neither file imports from the keyboard registry.

That the toggle cannot reach them follows from `keyboard-registry.ts`, where `matchBindings` filters its own `bindings` argument and nothing else, and from `use-keyboard-registry.ts`, whose single listener feeds it from the `registrations` map alone. Absence from both discoverability surfaces follows the same way: `useKeyboardBindings` projects `registrations`, and `groupByLayerAndGroup` groups only what that projection carries.

The block editor's `/` is not part of this claim: it fires from the textarea's own handler at `shared/pages-ui/src/block-editor/use-textarea-input.ts` gated on the block being empty, so focus scopes it.

WHAT I DID NOT MEASURE. I read the source rather than running either application, so I did not observe a key press with the toggle off. I did not check whether a lint rule, a test or an audit elsewhere in the code repo already reports these three; I searched the instructions repo for keyboard, shortcut and WCAG and found nothing, but ran no equivalent search over the code repo's checks. I did not sweep the other product web packages for further raw listeners — these three came from one document's list, which I confirmed, so three is a floor rather than a total.
