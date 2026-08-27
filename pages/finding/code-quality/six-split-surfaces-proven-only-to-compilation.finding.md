---
id: 8594e207-f8d2-5841-ade6-0315e9d33232
slug: six-split-surfaces-proven-only-to-compilation
page-type-slug: finding
title: "Six split surfaces are proven only as far as compilation, and no instrument here can observe the rest"
domain-slug: domain/code-quality
---

# Claim

Six split surfaces from #19315 have been proven only as far as emitted Lua, load order and compilation. Whether they read and draw correctly in a running client has not been observed by anyone, and no instrument here can observe it.

# Evidence

#19315 closed with all three quoted intents on `pages/domain/file-length.domain.md` verified by instruments the lead ran: a sweep of ~/code importing the deployed predicate (16,158 tracked, 14,058 reached, 103 over, all outside — 59 shape, 42 machine-written, 2 under test, zero violations), and the hook itself run over four payloads (over-ceiling authored .ts into ~/code denies; under-ceiling allows; over-ceiling exports-only allows; anything inside the instructions repo returns early).

None of that reaches the rendered surfaces. The manager reported these as proven only to compilation:

From #19318 — the lorebooks settings panel, and the rune views.
From #19317 — the notification hooks, the settings menu panels, the custom menu submenu, the scrollable menu debug logging, and the set tooltip text.

A split is verified against behaviour, and for these the behaviour is what a person sees in a running client. The tree's own checks pass over them because compilation and load order are what those checks read.

The row was closed rather than held open, the quoted intent having been met. A held row watches nothing: nobody works a waiting row and its status stops saying what the project needs.
