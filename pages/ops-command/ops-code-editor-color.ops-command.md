---
id: a23a8416-a929-577e-8976-89774df48c8a
page-type-slug: ops-command
title: "Ops code-editor color"
slug: ops-code-editor-color
domain-parent-slug: domain/ops-code-editor
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/code-editor/color.ts
path: code-editor color
---

# Definition

- **Ops code-editor color** — the color each agent surface draws from, and where they disagree.

# Help

Every color an agent is drawn in is stated on a page rather than settled in code. A
turn state's page names a color, and that color's page either names a hex or names
none. This gathers those layers in one place: what each state states, what the
palette resolves it to, and what each producer answers when asked right now.

The producers are run rather than described, so what stands here is what a panel
asking at this moment receives. The key an answer arrives under is reported beside
the answer, because a consumer reading the other spelling of that key sees nothing
and reports no fault.

Every disagreement is reported and none of them is a verdict. This reports rather
than rules, so it always exits zero and a reading is something to look at rather
than something failing. Two turn states drawing in one color is stated deliberately
and is reported for that reason rather than as a defect.
