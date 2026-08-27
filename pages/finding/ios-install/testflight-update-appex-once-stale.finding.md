---
id: f84557bf-d397-5109-924d-f3e7b27d3810
page-type-slug: finding
title: "Testflight update appex once stale"
domain-slug: domain/ios-install
---

# Claim

A TestFlight update usually replaces the widget extension, and once did not — so a widget change absent from Alan's home screen after an update is not evidence that the build is stale.

# Evidence

Two readings on Alan's own phone, two days running, going opposite ways.

2026-08-10, build 176. He installed it as an update. Every widget he had not touched went on drawing what the pre-176 binary produced, and every widget he deleted and re-added drew WidgetKit's redacted placeholder and never advanced past it. Everything upstream was verified sound, down to the compiled extension inside the 176 archive carrying the new decode keys and none of the glyph names of the code it replaced. Deleting the APP — not the widgets — and reinstalling fixed it immediately. That cost a day of diagnosis.

2026-08-10, build 182, installed as a plain update with nothing deleted first, as a deliberate test of the same path. The tiles changed. Alan confirmed the new drawing on his home screen: zeros where the em-dash stood, arcs on the inbox counts, Safety at a half step. So the update path does replace the extension, and the earlier failure does not reproduce on demand.

The obvious cause was ruled out before the second reading. Build 181's exported `.ipa` carries `CFBundleVersion` 181 on the app bundle and on `ValuesWidgetExtension.appex` alike, so iOS is not being handed an unchanged extension version to skip.

The simulator does not reproduce the failure either: installing 175 over 176 and 176 over 175 without uninstalling swapped the appex each time, with a new container UUID and PlugInKit re-pointed.

What this leaves is a failure that happened once, under conditions nobody has been able to recreate, on a path that otherwise works. The cost of assuming it is normal is a delete-and-reinstall nobody needed; the cost of assuming it cannot happen is another day spent proving a sound build sound. Nothing reports which extension build is running, so neither assumption can be checked from this side — an old extension and a new one issue identical requests, and a widget killed on its time or memory budget leaves the placeholder standing with no crash log.
