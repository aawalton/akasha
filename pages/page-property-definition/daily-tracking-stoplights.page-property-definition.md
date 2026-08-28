---
id: b06cf496-89e1-5ff9-939e-254e7d870f60
page-type-slug: page-property-definition
title: "Daily tracking stoplights"
defined-on-slug: page-type/daily-tracking
key: stoplights
type: text
expression: ((prop(faith-level) == 4) && "🔵" || (prop(faith-level) == 3) && "🟢" || (prop(faith-level) == 2) && "🟡" || (prop(faith-level) == 1) && "🔴" || "⚫") + ((prop(love-level) == 4) && "🔵" || (prop(love-level) == 3) && "🟢" || (prop(love-level) == 2) && "🟡" || (prop(love-level) == 1) && "🔴" || "⚫") + ((prop(health-level) == 4) && "🔵" || (prop(health-level) == 3) && "🟢" || (prop(health-level) == 2) && "🟡" || (prop(health-level) == 1) && "🔴" || "⚫") + ((prop(learn-level) == 4) && "🔵" || (prop(learn-level) == 3) && "🟢" || (prop(learn-level) == 2) && "🟡" || (prop(learn-level) == 1) && "🔴" || "⚫") + ((prop(fun-level) == 4) && "🔵" || (prop(fun-level) == 3) && "🟢" || (prop(fun-level) == 2) && "🟡" || (prop(fun-level) == 1) && "🔴" || "⚫") + ((prop(wealth-level) == 4) && "🔵" || (prop(wealth-level) == 3) && "🟢" || (prop(wealth-level) == 2) && "🟡" || (prop(wealth-level) == 1) && "🔴" || "⚫")
slug: daily-tracking-stoplights
domain-parent-slug: page-type/daily-tracking
---

# Definition

- **Daily tracking stoplights** — the rung each of the day's six values reached, as one colored light apiece.
