---
id: 6e2f2462-8faf-5eb6-a174-e207e11922ad
slug: widget-swift-unchecked
page-type-slug: finding
title: "Widget swift unchecked"
domain-slug: ios-app/smilingjenny-ios
---

# Claim

Jenny's widget Swift is read by no check, and nothing reports that it is unread.

# Evidence

`packages/infra/checks/src/lib/check-configs-widget.ts` registers the payload-shape mirror against one watched site, `{ kind: "swift-file", under: "packages/alanwalton/native-shell/ios-widget" }`. Jenny's `packages/smilingjenny/native-shell/ios-widget` is not among them, so `widget-payload-shape-mirror.ts` — which compares Swift struct fields against the TypeScript wire declarations by reading the source as text — never opens her files.

Her shell holds `CategorizeWidget.swift`, `CategorizeView.swift` and `WidgetFeed.swift`. The categorize tile decodes the same `/api/categorization` payload Alan's does, so the mirror is exactly the check that would catch her decoder drifting from the route. Nothing else compiles or reads that Swift either: no CI step in this repo runs `xcodebuild` or `swiftc`, and neither `ios-widget` directory holds a test target.

`widget-sites.unit.test.ts` already names her directory as a second site alongside Alan's, and a hypothetical third, so the discovery side is built for more than one shell. What is missing is the registration.

The reading that settles it: a deliberate mismatch between a struct field in her widget Swift and the key her route sends, which should be refused and today passes.

This stands whatever project #18945 does. It is recorded there as the hazard behind that project's fourth criterion, because moving shared Swift out of Alan's directory would take it out of the one watched site as well — but the gap on her side is older than that project and outlives it.
