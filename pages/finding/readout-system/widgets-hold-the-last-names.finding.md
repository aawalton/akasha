---
id: 1f320316-e8f1-5406-8dda-bed726accc1a
page-type-slug: finding
title: "The iOS widgets hold the last stoplight names in code, and one copy has drifted"
domain-slug: domain/readout-system
---

# Claim

The iOS widgets hold the last copies of stoplight names in code, in three shapes, and one of them has already drifted from the documents it copies.

# Evidence

Found on 2026-08-21, as four seats moved the four stoplight groups onto their documents. The shared package is nearly clear; the Swift is not, and nothing in this pass could reach it.

**Label dictionaries.** `InboxStoplightsWidget.swift` and `ValuesStoplightsWidget.swift` each map a stoplight's key to its display wording, because the payload used to carry no label. Both payloads now carry one, so each widget is a single line from reading the label the feed sends. They were left standing deliberately: a shipped build must keep decoding what it already decodes until a build carrying the change has left every device.

**Preview fixtures.** Six widget files hold a hand-written fixture naming their stoplights. `PersonaStoplightsWidget.swift` names all forty personas with a value beside each, and about thirty of those pairs disagree with the persona's own `value-slug` — code says Abby is fun where her document says faith. The fixture never renders live, so nothing has ever reported the drift.

**A deep link.** `InboxStoplightsWidget.swift` opens a link naming one inbox's page. No readout or readout-group document carries a deep-link property, so nothing in data can say where a stoplight leads. This is not a copy of anything; it is a fact only the widget holds.

**Two decoded fields nothing draws.** The values payload carries `face` and the personas payload carries `value`. Both are decoded on every refresh and never read, and neither can be dropped while a build that decodes them is still on a device.

Two widgets refuse a feed rather than drawing what it sends: `SafetyRing.swift` and `SurplusRing.swift` will not decode a payload whose key is not `safety` or `surplus`, which is why those two keys could not change when the group moved.
